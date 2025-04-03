import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(
    @Query('userId') userId: string,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<ApiResponse> {
    const data = await this.favoritesService.addFavorite(userId, createFavoriteDto);
    return {
      code: 0,
      msg: '收藏成功',
      data,
    };
  }

  @Get()
  async getUserFavorites(@Query('userId') userId: string): Promise<ApiResponse> {
    const data = await this.favoritesService.getUserFavoritesWithProducts(userId);
    return {
      code: 0,
      msg: '操作成功',
      data,
    };
  }

  @Delete(':id')
  async removeFavorite(
    @Query('userId') userId: string, 
    @Param('id') id: string
  ): Promise<ApiResponse> {
    await this.favoritesService.removeFavorite(userId, id);
    return {
      code: 0,
      msg: '取消收藏成功',
      data: null,
    };
  }

  @Delete('product/:productId')
  async removeProductFromFavorites(
    @Query('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<ApiResponse> {
    await this.favoritesService.removeProductFromFavorites(userId, productId);
    return {
      code: 0,
      msg: '取消收藏成功',
      data: null,
    };
  }

  @Get('check/:productId')
  async checkIsFavorite(
    @Query('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<ApiResponse> {
    const isFavorite = await this.favoritesService.checkIsFavorite(userId, productId);
    return {
      code: 0,
      msg: '操作成功',
      data: { isFavorite },
    };
  }
}
