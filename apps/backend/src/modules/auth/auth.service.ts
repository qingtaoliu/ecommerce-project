import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload, LoginResponse } from './interfaces/auth.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    // 更新最后登录时间
    await this.usersService.updateLastLogin(user.id);
    
    return this.generateLoginResponse(user);
  }

  async register(registerDto: RegisterDto): Promise<LoginResponse> {
    // 验证密码是否匹配
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('两次输入的密码不一致');
    }
    
    // 创建用户（UsersService.create 方法已经包含了邮箱验证和密码加密）
    const { confirmPassword, ...createUserData } = registerDto;
    const newUser = await this.usersService.create(createUserData);
    
    // 获取完整用户信息（包括密码，用于生成令牌）
    const fullUser = await this.usersService.findByEmail(newUser.email);
    
    if (!fullUser) {
      throw new BadRequestException('用户创建失败');
    }
    
    // 更新最后登录时间
    await this.usersService.updateLastLogin(fullUser.id);
    
    // 生成登录响应（包含令牌和用户信息）
    return this.generateLoginResponse(fullUser);
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('邮箱或密码不正确');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('邮箱或密码不正确');
    }
    
    return user;
  }

  private generateLoginResponse(user: User): LoginResponse {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    // 创建JWT令牌
    const access_token = this.jwtService.sign(payload);
    
    // 移除密码字段
    const { password, ...userWithoutPassword } = user;
    
    return {
      access_token,
      user: userWithoutPassword as Omit<User, 'password'>
    };
  }
}
