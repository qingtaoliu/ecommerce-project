import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ShippingAddress } from './entities/shipping-address.entity';
import { Shipment, ShipmentStatus } from './entities/shipment.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { Product } from '../products/entities/product.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(ShippingAddress)
    private shippingAddressRepository: Repository<ShippingAddress>,
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private dataSource: DataSource,
  ) {}

  // 创建收货地址
  async createShippingAddress(userId: string, createShippingAddressDto: CreateShippingAddressDto): Promise<ShippingAddress> {
    const { isDefault = false } = createShippingAddressDto;

    // 如果设置为默认地址，则将其他地址设置为非默认
    if (isDefault) {
      await this.shippingAddressRepository.update(
        { userId, isDefault: true },
        { isDefault: false }
      );
    }

    const shippingAddress = this.shippingAddressRepository.create({
      userId,
      ...createShippingAddressDto,
    });

    return this.shippingAddressRepository.save(shippingAddress);
  }

  // 获取用户的收货地址列表
  async getUserShippingAddresses(userId: string): Promise<ShippingAddress[]> {
    return this.shippingAddressRepository.find({
      where: { userId },
      order: { isDefault: 'DESC', created_at: 'DESC' },
    });
  }

  // 获取收货地址详情
  async getShippingAddressById(id: string, userId: string): Promise<ShippingAddress> {
    const shippingAddress = await this.shippingAddressRepository.findOne({
      where: { id, userId },
    });

    if (!shippingAddress) {
      throw new NotFoundException('收货地址不存在');
    }

    return shippingAddress;
  }

  // 更新收货地址
  async updateShippingAddress(
    id: string,
    userId: string,
    updateShippingAddressDto: CreateShippingAddressDto,
  ): Promise<ShippingAddress> {
    const { isDefault = false } = updateShippingAddressDto;
    const shippingAddress = await this.getShippingAddressById(id, userId);

    // 如果设置为默认地址，则将其他地址设置为非默认
    if (isDefault && !shippingAddress.isDefault) {
      await this.shippingAddressRepository.update(
        { userId, isDefault: true },
        { isDefault: false }
      );
    }

    Object.assign(shippingAddress, updateShippingAddressDto);
    return this.shippingAddressRepository.save(shippingAddress);
  }

  // 删除收货地址
  async deleteShippingAddress(id: string, userId: string): Promise<void> {
    const shippingAddress = await this.getShippingAddressById(id, userId);
    await this.shippingAddressRepository.remove(shippingAddress);
  }

  // 创建订单
  async createOrder(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    // 验证收货地址是否存在
    const shippingAddress = await this.shippingAddressRepository.findOne({
      where: { id: createOrderDto.shippingAddressId, userId },
    });

    if (!shippingAddress) {
      throw new NotFoundException('收货地址不存在');
    }

    // 开始事务
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 计算订单总金额并验证库存
      let total = 0;
      const orderItems: Partial<OrderItem>[] = [];

      for (const item of createOrderDto.items) {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(`商品 ${item.productId} 不存在`);
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(`商品 ${product.name} 库存不足`);
        }

        // 减少库存
        product.stock -= item.quantity;
        await queryRunner.manager.save(product);

        // 计算商品总价
        const itemPrice = parseFloat(product.price.toString()) * item.quantity;
        total += itemPrice;

        // 添加到订单项
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: itemPrice,
        });
      }

      // 创建订单
      const order = new Order();
      order.userId = userId;
      order.shippingAddressId = shippingAddress.id;
      order.total = total;
      order.status = OrderStatus.PENDING;
      order.notes = createOrderDto.notes || '';

      // 保存订单
      const savedOrder = await queryRunner.manager.save(order);

      // 保存订单项
      for (const item of orderItems) {
        const orderItem = new OrderItem();
        orderItem.orderId = savedOrder.id;
        orderItem.productId = item.productId!;
        orderItem.quantity = item.quantity!;
        orderItem.price = item.price!;
        await queryRunner.manager.save(orderItem);
      }

      // 创建物流信息
      const shipment = new Shipment();
      shipment.order_id = savedOrder.id;
      shipment.status = ShipmentStatus.PROCESSING;
      await queryRunner.manager.save(shipment);

      // 提交事务
      await queryRunner.commitTransaction();

      // 返回完整订单信息
      return this.getOrderById(savedOrder.id, userId);
    } catch (error) {
      // 回滚事务
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 释放查询运行器
      await queryRunner.release();
    }
  }

  // 获取用户订单列表
  async getUserOrders(userId: string, status?: OrderStatus): Promise<Order[]> {
    const query = this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'item')
      .leftJoinAndSelect('item.product', 'product')
      .leftJoinAndSelect('order.shippingAddress', 'shippingAddress')
      .leftJoinAndSelect('order.shipment', 'shipment')
      .where('order.userId = :userId', { userId })
      .orderBy('order.created_at', 'DESC');

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    return query.getMany();
  }

  // 获取订单详情
  async getOrderById(id: string, userId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id, userId },
      relations: ['items', 'items.product', 'shippingAddress', 'shipment'],
    });

    if (!order) {
      throw new NotFoundException('订单不存在1111');
    }

    return order;
  }

  // 更新订单状态
  async updateOrderStatus(id: string, userId: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.getOrderById(id, userId);
    
    // 验证状态转换是否合法
    this.validateStatusTransition(order.status, updateOrderStatusDto.status);
    
    order.status = updateOrderStatusDto.status;
    
    // 如果订单状态变为已发货，更新物流状态
    if (order.status === OrderStatus.SHIPPED && order.shipment) {
      order.shipment.status = ShipmentStatus.SHIPPED;
      await this.shipmentRepository.save(order.shipment);
    }
    
    // 如果订单状态变为已送达，更新物流状态
    if (order.status === OrderStatus.DELIVERED && order.shipment) {
      order.shipment.status = ShipmentStatus.DELIVERED;
      await this.shipmentRepository.save(order.shipment);
    }
    
    return this.orderRepository.save(order);
  }

  // 验证订单状态转换是否合法
  private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): void {
    // 定义合法的状态转换
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(`不能从 ${currentStatus} 状态转换为 ${newStatus} 状态`);
    }
  }

  // 取消订单
  async cancelOrder(id: string, userId: string): Promise<Order> {
    const order = await this.getOrderById(id, userId);
    
    // 只有待支付和已确认的订单可以取消
    if (![OrderStatus.PENDING, OrderStatus.CONFIRMED].includes(order.status)) {
      throw new BadRequestException('只有待支付和已确认的订单可以取消');
    }
    
    // 开始事务
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      // 恢复库存
      for (const item of order.items) {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });
        
        if (product) {
          product.stock += item.quantity;
          await queryRunner.manager.save(product);
        }
      }
      
      // 更新订单状态
      order.status = OrderStatus.CANCELLED;
      await queryRunner.manager.save(order);
      
      // 提交事务
      await queryRunner.commitTransaction();
      
      return order;
    } catch (error) {
      // 回滚事务
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 释放查询运行器
      await queryRunner.release();
    }
  }

  // 获取或创建用户的购物车
  private async getOrCreateCart(userId: string): Promise<Cart> {
    // 查找用户未结账的购物车
    let cart = await this.cartRepository.findOne({
      where: { userId, isCheckedOut: false },
    });

    // 如果不存在，则创建一个新的购物车
    if (!cart) {
      cart = this.cartRepository.create({ userId });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  // 添加商品到购物车
  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<CartItem> {
    const { productId, quantity } = addToCartDto;

    // 检查商品是否存在
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('商品不存在');
    }

    // 检查商品库存
    if (product.stock < quantity) {
      throw new BadRequestException('商品库存不足');
    }

    // 获取或创建用户的购物车
    const cart = await this.getOrCreateCart(userId);

    // 检查购物车中是否已存在该商品
    let cartItem = await this.cartItemRepository.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      // 如果已存在，则更新数量
      cartItem.quantity += quantity;
      cartItem.price = (product.price * cartItem.quantity).toString();
      return this.cartItemRepository.save(cartItem);
    } else {
      // 如果不存在，则创建新的购物车项
      cartItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId,
        quantity,
        price: (product.price * quantity).toString(),
      });
      return this.cartItemRepository.save(cartItem);
    }
  }

  // 获取用户的购物车
  async getUserCart(userId: string): Promise<Cart> {
    debugger;
    console.log(`尝试获取用户 ${userId} 的购物车`);
    
    const cart = await this.cartRepository.findOne({
      where: { userId, isCheckedOut: false },
      relations: ['items', 'items.product'],
    });

    console.log('查询结果:', cart);

    if (!cart) {
      console.log('购物车不存在，创建新购物车');
      // 如果购物车不存在，则创建一个新的购物车
      const newCart = this.cartRepository.create({ userId });
      const savedCart = await this.cartRepository.save(newCart);
      console.log('新创建的购物车:', savedCart);
      return savedCart;
    }

    return cart;
  }

  // 更新购物车项
  async updateCartItem(userId: string, cartItemId: string, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    const { quantity } = updateCartItemDto;

    // 获取用户的购物车
    const cart = await this.getOrCreateCart(userId);

    // 查找购物车项
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId, cartId: cart.id },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException('购物车项不存在');
    }

    // 检查商品库存
    if (cartItem.product.stock < quantity) {
      throw new BadRequestException('商品库存不足');
    }

    // 更新数量和价格
    cartItem.quantity = quantity;
    cartItem.price = (cartItem.product.price * quantity).toString();

    return this.cartItemRepository.save(cartItem);
  }

  // 删除购物车项
  async removeCartItem(userId: string, cartItemId: string): Promise<void> {
    // 获取用户的购物车
    const cart = await this.getOrCreateCart(userId);

    // 查找购物车项
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId, cartId: cart.id },
    });

    if (!cartItem) {
      throw new NotFoundException('购物车项不存在');
    }

    await this.cartItemRepository.remove(cartItem);
  }

  // 清空购物车
  async clearCart(userId: string): Promise<void> {
    // 获取用户的购物车
    const cart = await this.getOrCreateCart(userId);

    // 删除购物车中的所有项
    await this.cartItemRepository.delete({ cartId: cart.id });
  }

  // 从购物车创建订单
  async createOrderFromCart(userId: string, shippingAddressId: string, notes?: string): Promise<Order> {
    // 获取用户的购物车
    const cart = await this.cartRepository.findOne({
      where: { userId, isCheckedOut: false },
      relations: ['items', 'items.product'],
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      throw new BadRequestException('购物车为空');
    }

    // 检查收货地址是否存在
    const shippingAddress = await this.shippingAddressRepository.findOne({
      where: { id: shippingAddressId, userId },
    });

    if (!shippingAddress) {
      throw new NotFoundException('收货地址不存在');
    }

    // 开始事务
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 创建订单
      const order = this.orderRepository.create();
      order.userId = userId; // 确保设置userId
      order.shippingAddressId = shippingAddressId;
      order.notes = notes || '';
      order.status = OrderStatus.PENDING; // 设置初始状态

      // 计算订单总金额
      let total = 0;
      for (const item of cart.items) {
        total += Number(item.price);
      }
      order.total = total;

      console.log('准备创建订单:', { userId, shippingAddressId, total });

      // 保存订单
      const savedOrder = await queryRunner.manager.save(order);
      console.log('订单创建成功:', savedOrder);

      // 创建订单项
      for (const item of cart.items) {
        const orderItem = new OrderItem();
        orderItem.orderId = savedOrder.id;
        orderItem.productId = item.productId;
        orderItem.quantity = item.quantity;
        orderItem.price = Number(item.price);
        await queryRunner.manager.save(orderItem);

        // 更新商品库存
        const product = item.product;
        product.stock -= item.quantity;
        await queryRunner.manager.save(product);
      }

      // 创建物流信息
      const shipment = new Shipment();
      shipment.order_id = savedOrder.id;
      shipment.status = ShipmentStatus.PROCESSING;
      await queryRunner.manager.save(shipment);

      // 标记购物车为已结账
      cart.isCheckedOut = true;
      await queryRunner.manager.save(cart);

      // 提交事务
      await queryRunner.commitTransaction();

      return this.getOrderById(savedOrder.id, userId);
    } catch (error) {
      // 回滚事务
      await queryRunner.rollbackTransaction();
      console.error('创建订单失败:', error);
      throw error;
    } finally {
      // 释放查询运行器
      await queryRunner.release();
    }
  }
}
