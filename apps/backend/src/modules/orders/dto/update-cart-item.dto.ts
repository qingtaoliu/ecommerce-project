import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
