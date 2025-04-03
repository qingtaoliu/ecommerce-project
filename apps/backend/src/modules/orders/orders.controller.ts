import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, BadRequestException, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { OrderStatus } from './entities/order.entity';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // 创建订单
  @Post("create")
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Req() request,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    const data = await this.ordersService.createOrder(userId, createOrderDto);
    return {
      code: 0,
      msg: '订单创建成功',
      data: data,
    };
  }

  // 获取用户订单列表
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserOrders(
    @Req() request,
    @Query('status') status?: OrderStatus,
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    const data = await this.ordersService.getUserOrders(userId, status);
    return {
      code: 0,
      msg: '操作成功',
      data,
    };
  }

  // 获取用户的购物车
  @Get('cart')
  @UseGuards(JwtAuthGuard)
  async getUserCart(
    @Req() request,
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    const cartItems = await this.ordersService.getUserCart(userId);
    return {
      code: 0,
      msg: '操作成功',
      data: cartItems,
    };
  }

  // 添加商品到购物车
  @Post('cart/items')
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @Req() request,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    const cartItem = await this.ordersService.addToCart(userId, addToCartDto);
    return {
      code: 0,
      msg: '商品已添加到购物车',
      data: cartItem,
    };
  }

  // 更新购物车项
  @Put('cart/items/:id')
  @UseGuards(JwtAuthGuard)
  async updateCartItem(
    @Req() request,
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    const cartItem = await this.ordersService.updateCartItem(userId, id, updateCartItemDto);
    return {
      code: 0,
      msg: '购物车项已更新',
      data: cartItem,
    };
  }

  // 删除购物车项
  @Delete('cart/items/:id')
  @UseGuards(JwtAuthGuard)
  async removeCartItem(
    @Req() request,
    @Param('id') id: string,
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    await this.ordersService.removeCartItem(userId, id);
    return {
      code: 0,
      msg: '购物车项已删除',
      data: null,
    };
  }

  // 清空购物车
  @Delete('cart')
  @UseGuards(JwtAuthGuard)
  async clearCart(
    @Req() request,
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    await this.ordersService.clearCart(userId);
    return {
      code: 0,
      msg: '购物车已清空',
      data: null,
    };
  }

  // 从购物车创建订单
  @Post('cart/checkout')
  @UseGuards(JwtAuthGuard)
  async createOrderFromCart(
    @Req() request,
    @Body() body: { shippingAddressId: string, notes?: string },
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    const order = await this.ordersService.createOrderFromCart(
      userId,
      body.shippingAddressId,
      body.notes,
    );
    return {
      code: 0,
      msg: '订单创建成功',
      data: order,
    };
  }

  // 创建收货地址
  @Post('shipping-addresses')
  @UseGuards(JwtAuthGuard)
  async createShippingAddress(
    @Req() request,
    @Body() createShippingAddressDto: CreateShippingAddressDto,
  ): Promise<ApiResponse> {
    const userId = request.user.id;
    const address = await this.ordersService.createShippingAddress(userId, createShippingAddressDto);
    return {
      code: 0,
      msg: '收货地址创建成功',
      data: address,
    };
  }

  // 获取用户收货地址列表
  @Get('shipping-addresses')
  @UseGuards(JwtAuthGuard)
  async getUserShippingAddresses(
    @Req() request
  ): Promise<ApiResponse> {
    console.log(request);
    // 从请求对象中获取用户ID
    const userId = request.user.id;
    const data = await this.ordersService.getUserShippingAddresses(userId);
    return {
      code: 0,
      msg: '操作成功',
      data: data,
    };
  }

  // 获取收货地址详情
  @Get('shipping-addresses/:id')
  @UseGuards(JwtAuthGuard)
  async getShippingAddressById(
    @Req() request,
    @Param('id') id: string,
  ) {
    // 从请求对象中获取用户ID
    const userId = request.user.id;
    return {
      code: 0,
      msg: '操作成功',
      data: await this.ordersService.getShippingAddressById(id, userId),
    };
  }

  // 更新收货地址
  @Put('shipping-addresses/:id')
  @UseGuards(JwtAuthGuard)
  async updateShippingAddress(
    @Req() request,
    @Param('id') id: string,
    @Body() updateShippingAddressDto: CreateShippingAddressDto,
  ) {
    // 从请求对象中获取用户ID
    const userId = request.user.id;
    return {
      code: 0,
      msg: '收货地址更新成功',
      data: await this.ordersService.updateShippingAddress(id, userId, updateShippingAddressDto),
    };
  }

  // 删除收货地址
  @Delete('shipping-addresses/:id')
  @UseGuards(JwtAuthGuard)
  async deleteShippingAddress(
    @Req() request,
    @Param('id') id: string,
  ) {
    // 从请求对象中获取用户ID
    const userId = request.user.id;
    await this.ordersService.deleteShippingAddress(id, userId);
    return {
      code: 0,
      msg: '收货地址删除成功',
      data: null,
    };
  }

  // 获取订单详情
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(
    @Req() request,
    @Param('id') id: string,
  ) {
    const userId = request.user.id;
    const data = await this.ordersService.getOrderById(id, userId);
    return {
      code: 0,
      msg: '操作成功',
      data: data,
    };
  }

  // 更新订单状态
  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(
    @Req() request,
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const userId = request.user.id;
    const data = await this.ordersService.updateOrderStatus(id, userId, updateOrderStatusDto);
    return {
      code: 0,
      msg: '订单状态更新成功',
      data: data,
    };
  }

  // 取消订单
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async cancelOrder(
    @Req() request,
    @Param('id') id: string,
  ) {
    const userId = request.user.id;
    const data = await this.ordersService.cancelOrder(id, userId);
    return {
      code: 0,
      msg: '订单取消成功',
      data: data,
    };
  }
}
