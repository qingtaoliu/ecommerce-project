import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(query: ProductQueryDto) {
    const { 
      categoryId, 
      categories,
      minPrice, 
      maxPrice, 
      orderBy = 'createdAt',
      orderDirection = 'DESC',
      includeInactive = false,
      keyword,
      page = 1,
      pageSize = 10
    } = query;

    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    // 分类过滤
    if (categoryId || (categories && categories.length > 0)) {
      let whereClause = '';
      const params: any = {};
      
      if (categoryId) {
        whereClause = 'product.categoryId = :categoryId';
        params.categoryId = categoryId;
      }
      
      if (categories && categories.length > 0) {
        if (whereClause) {
          whereClause += ' OR ';
        }
        whereClause += 'product.category IN (:...categories)';
        params.categories = categories;
      }
      
      console.log('分类查询条件:', whereClause);
      console.log('分类查询参数:', params);
      
      queryBuilder.andWhere(whereClause, params);
    }

    // 价格范围过滤
    if (minPrice !== undefined && maxPrice !== undefined) {
      queryBuilder.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    } else if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    } else if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }
    
    // 关键词搜索
    if (keyword) {
      queryBuilder.andWhere(
        '(product.name LIKE :keyword OR product.description LIKE :keyword OR product.brief LIKE :keyword)',
        { keyword: `%${keyword}%` }
      );
    }

    // 状态过滤
    if (!includeInactive) {
      queryBuilder.andWhere('product.isActive = :isActive', { isActive: true });
    }

    // 排序
    queryBuilder.orderBy(`product.${orderBy}`, orderDirection as 'ASC' | 'DESC');
    
    // 计算总数
    const total = await queryBuilder.getCount();
    
    // 添加分页
    queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const products = await queryBuilder.getMany();
    
    return {
      data: products,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  }

  async findMeta(query: ProductQueryDto) {
    const { 
      page = 1, 
      pageSize = 10, 
      keyword,
      categoryId,
      categories,
      minPrice,
      maxPrice,
      includeInactive = false,
    } = query;

    const queryBuilder = this.productsRepository.createQueryBuilder('product');
    
    // 关键字搜索
    if (keyword) {
      queryBuilder.andWhere('(product.name LIKE :keyword OR product.description LIKE :keyword)', {
        keyword: `%${keyword}%`,
      });
    }

    // 类别过滤 - 支持ID或名称
    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }
    
    // 支持多个分类名称过滤
    if (categories && categories.length > 0) {
      // 使用 OR 条件连接多个分类，使用精确匹配
      const conditions = categories.map((_, index) => `product.category = :category${index}`);
      const params = {};
      
      categories.forEach((category, index) => {
        params[`category${index}`] = category;
      });
      
      queryBuilder.andWhere(`(${conditions.join(' OR ')})`, params);
    }

    // 价格范围过滤
    if (minPrice !== undefined && maxPrice !== undefined) {
      queryBuilder.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    } else if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    } else if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    // 状态过滤
    if (!includeInactive) {
      queryBuilder.andWhere('product.isActive = :isActive', { isActive: true });
    }

    const total = await queryBuilder.getCount();

    return {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('商品不存在');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    product.isActive = false;
    await this.productsRepository.save(product);
  }

  async hardRemove(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('商品不存在');
    }
  }

  async findHotProducts(limit: number = 10) {
    const products = await this.productsRepository.find({
      where: { isActive: true },
      order: { rating: 'DESC', sales: 'DESC' },
      take: limit
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      sales: product.sales,
      link: `/product/${product.id}`,
      category: product.category
    }));
  }
  
  async findNewProducts(limit: number = 10) {
    const products = await this.productsRepository.find({
      where: { isActive: true },
      order: { created_at: 'DESC' },
      take: limit
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      sales: product.sales,
      link: `/product/${product.id}`,
      category: product.category,
      createdAt: product.created_at
    }));
  }
}
