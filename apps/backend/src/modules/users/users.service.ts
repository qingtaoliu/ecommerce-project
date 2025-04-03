import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email } = createUserDto;

    // 检查邮箱是否已存在
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('邮箱已被注册');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    // 如果没有提供 nickname，则使用 username 作为 nickname
    if (!createUserDto.nickname && createUserDto.username) {
      createUserDto.nickname = createUserDto.username;
    }
    
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findAll(query: PaginationQueryDto) {
    const { page = 1, pageSize = 10, keyword, orderBy = 'created_at', orderDirection = 'DESC', role, includeInactive = false } = query;

    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    // 关键字搜索
    if (keyword) {
      queryBuilder.andWhere('(user.nickname LIKE :keyword OR user.email LIKE :keyword)', {
        keyword: `%${keyword}%`,
      });
    }

    // 角色过滤
    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    // 状态过滤
    if (!includeInactive) {
      queryBuilder.andWhere('user.status = :status', { status: UserStatus.ACTIVE });
    }

    // 排序
    queryBuilder.orderBy(`user.${orderBy}`, orderDirection as 'ASC' | 'DESC');

    // 分页
    const skip = (page - 1) * pageSize;
    queryBuilder.skip(skip).take(pageSize);

    const [users, total] = await queryBuilder.getManyAndCount();
    
    // 移除密码字段
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    return {
      items: usersWithoutPassword,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['orders', 'orders.items', 'orders.items.product', 'orders.shippingAddress', 'orders.shipment', 
                 'carts', 'carts.items', 'carts.items.product', 
                 'shippingAddresses']
    });
    
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    
    // 移除密码字段
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, {
      last_login: new Date()
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.findOne(id);

    // 如果要更新密码，需要加密
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // 如果将昵称设置为 null，且提供了用户名，则使用用户名作为昵称
    if (updateUserDto.nickname === null && updateUserDto.username) {
      updateUserDto.nickname = updateUserDto.username;
    }
    // 如果将昵称设置为 null，且没有提供用户名，则保持原来的昵称
    else if (updateUserDto.nickname === null && !updateUserDto.username) {
      delete updateUserDto.nickname; // 从更新对象中删除 nickname 字段，保持原值
    }

    Object.assign(user, updateUserDto);
    const savedUser = await this.usersRepository.save(user);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    user.status = UserStatus.INACTIVE;
    await this.usersRepository.save(user);
  }
}
