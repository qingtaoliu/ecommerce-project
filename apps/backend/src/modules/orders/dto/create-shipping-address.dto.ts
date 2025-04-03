import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  recipientName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  detailAddress: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
