import { IsOptional, IsUUID, IsNumber, Min, Max, IsArray, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class ProductQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    // 处理字符串转数组
    if (typeof value === 'string') {
      // 如果字符串包含逗号，按逗号分隔
      if (value.includes(',')) {
        return value.split(',').map(item => item.trim());
      }
      return [value];
    }
    return value;
  })
  @IsString({ each: true })
  @IsArray()
  categories?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
