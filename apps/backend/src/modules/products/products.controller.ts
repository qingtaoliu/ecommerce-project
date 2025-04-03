import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query: ProductQueryDto) {
    console.log('查询参数:', query);
    const serviceResult = await this.productsService.findAll(query);
    return serviceResult;
  }

  @Get('hot')
  async findHotProducts(@Query('limit') limit?: number) {
    return await this.productsService.findHotProducts(limit);
  }

  @Get('new')
  async findNewProducts(@Query('limit') limit?: number) {
    return await this.productsService.findNewProducts(limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('获取产品详情，ID:', id);
    try {
      const product = await this.productsService.findOne(id);
      console.log('产品详情查询结果:', product ? '成功' : '未找到');
      return {
        data: product,
        success: true
      };
    } catch (error) {
      console.error('获取产品详情失败:', error.message);
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
