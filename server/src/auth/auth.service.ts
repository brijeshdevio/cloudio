import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import argon2 from 'argon2';
import { User } from '@/entities/user.entity';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async generateJwtToken(
    userId: number,
    email: string,
  ): Promise<string> {
    const payload = { sub: userId, email };
    return await this.jwtService.signAsync(payload);
  }

  async signup(data: SignupDto) {
    try {
      data.password = await argon2.hash(data.password);
      const user = this.userRepository.create(data);
      await this.userRepository.save(user);
      return user;
    } catch (error: unknown) {
      const CONFLICT_ERROR_CODE = '23505';
      const err = error as { code: string };
      if (err?.code === CONFLICT_ERROR_CODE) {
        throw new ConflictException('Email already exists.');
      }
      throw error;
    }
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new NotFoundException('Invalid Credentials.');
    }

    const isValidPassword = await argon2.verify(user.password, data.password);
    if (isValidPassword) {
      const token = await this.generateJwtToken(user.id, user.email);
      return { token };
    }

    throw new NotFoundException('Invalid Credentials.');
  }
}
