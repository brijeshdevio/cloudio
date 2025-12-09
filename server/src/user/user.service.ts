import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getProfile(id: string) {
    const user = await this.userModel
      .findById(id)
      .lean()
      .select('-__v -password');
    if (user) {
      return user;
    }
    throw new UnauthorizedException('You are not authorized');
  }
}
