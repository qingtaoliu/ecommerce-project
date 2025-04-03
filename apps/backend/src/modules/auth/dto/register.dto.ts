import { IsString, IsEmail, IsOptional, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: '用户名长度不能少于3个字符' })
  username: string;

  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;

  @IsString()
  @MinLength(6, { message: '密码长度不能少于6个字符' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '密码必须包含至少一个大写字母、一个小写字母和一个数字或特殊字符',
  })
  password: string;

  @IsString()
  @MinLength(6, { message: '确认密码长度不能少于6个字符' })
  confirmPassword: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
