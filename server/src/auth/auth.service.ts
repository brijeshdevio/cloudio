import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import argon2 from 'argon2';
import { User } from '@/entities/user.entity';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private async generateJwtToken(
    userId: string,
    email: string,
  ): Promise<string> {
    const payload = { sub: userId, email };
    return await this.jwtService.signAsync(payload);
  }

  async signup(data: SignupDto) {
    try {
      data.password = await argon2.hash(data.password);
      const user = await this.userModel.create(data);
      return user;
    } catch (error: unknown) {
      const CONFLICT_ERROR_CODE = 11000;
      const err = error as { code: number };
      if (err?.code === CONFLICT_ERROR_CODE) {
        throw new ConflictException('Email already exists.');
      }
      throw error;
    }
  }

  async login(data: LoginDto) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new NotFoundException('Invalid Credentials.');
    }

    const isValidPassword = await argon2.verify(user.password, data.password);
    if (isValidPassword) {
      const token = await this.generateJwtToken(String(user._id), user.email);
      return { token };
    }

    throw new NotFoundException('Invalid Credentials.');
  }
}
