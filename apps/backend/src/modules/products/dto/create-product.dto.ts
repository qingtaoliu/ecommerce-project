import { IsString, IsNumber, IsArray, IsOptional, Min, IsUUID, IsObject, IsUrl, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsUUID()
  categoryId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  originalPrice?: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  @IsUrl({}, { each: false })
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  brief?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  rating?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  sales?: number;

  @IsObject()
  @IsOptional()
  specs?: Record<string, string[]>;

  @IsObject()
  @IsOptional()
  params?: Record<string, string>;
}
