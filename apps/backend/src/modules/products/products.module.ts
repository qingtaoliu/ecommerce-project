import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';
import { Favorite } from './entities/favorite.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Review, Favorite]),
  ],
  controllers: [ProductsController, FavoritesController],
  providers: [ProductsService, FavoritesService],
  exports: [TypeOrmModule, ProductsService, FavoritesService],
})
export class ProductsModule {}
