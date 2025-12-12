import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(id: number, email: string) {
    const user = await this.userRepository.findOne({
      where: { id, email },
      select: { id: true, email: true, name: true },
    });

    if (user) {
      return user;
    }

    throw new UnauthorizedException('You are not logged in.');
  }
}
