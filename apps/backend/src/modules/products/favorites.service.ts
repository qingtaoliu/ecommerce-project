import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Product } from './entities/product.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async addFavorite(userId: string, createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const { productId } = createFavoriteDto;
    
    // 检查商品是否存在
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('商品不存在');
    }
    
    // 检查是否已经收藏过该商品
    const existingFavorite = await this.favoritesRepository.findOne({
      where: { userId, productId },
    });
    
    if (existingFavorite) {
      throw new ConflictException('该商品已经在收藏列表中');
    }
    
    // 创建新的收藏记录
    const favorite = this.favoritesRepository.create({
      userId,
      productId,
    });
    
    return this.favoritesRepository.save(favorite);
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.favoritesRepository.find({
      where: { userId },
      order: { created_at: 'DESC' },
    });
  }

  async getUserFavoritesWithProducts(userId: string): Promise<any[]> {
    // 获取用户的收藏记录
    const favorites = await this.favoritesRepository.find({
      where: { userId },
      order: { created_at: 'DESC' },
    });
    
    // 获取收藏的商品详情
    const productIds = favorites.map(favorite => favorite.productId);
    const products = await this.productsRepository.findByIds(productIds);
    
    // 将收藏信息与商品信息合并
    return favorites.map(favorite => {
      const product = products.find(p => p.id === favorite.productId);
      return {
        id: favorite.id,
        userId: favorite.userId,
        productId: favorite.productId,
        created_at: favorite.created_at,
        updated_at: favorite.updated_at,
        product,
      };
    });
  }

  async removeFavorite(userId: string, favoriteId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { id: favoriteId, userId },
    });
    
    if (!favorite) {
      throw new NotFoundException('收藏记录不存在');
    }
    
    await this.favoritesRepository.remove(favorite);
  }

  async removeProductFromFavorites(userId: string, productId: string): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where: { userId, productId },
    });
    
    if (!favorite) {
      throw new NotFoundException('该商品未被收藏');
    }
    
    await this.favoritesRepository.remove(favorite);
  }

  async checkIsFavorite(userId: string, productId: string): Promise<boolean> {
    const favorite = await this.favoritesRepository.findOne({
      where: { userId, productId },
    });
    
    return !!favorite;
  }
}
