import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async checkDiskSpace(id: string, size: number) {
    const user = await this.userModel.findById(id).lean();
    if (user) {
      if (user.usedSpace + size >= user.diskQuota) {
        throw new ForbiddenException('Not enough disk space');
      }
      return true;
    }

    throw new UnauthorizedException('You are not authorized');
  }

  async updateUsedSpace(id: string, size: number) {
    const user = await this.userModel.findById(id);

    if (user) {
      user.usedSpace += size;

      if (user.usedSpace > user.diskQuota) {
        throw new ForbiddenException('Not enough disk space');
      }

      await user.save();
      return true;
    }

    throw new UnauthorizedException('You are not authorized');
  }

  async reduceUsedSpace(id: string, size: number) {
    const user = await this.userModel.findById(id);

    if (user) {
      user.usedSpace -= size;
      if (user.usedSpace < 0) {
        user.usedSpace = 0;
      }
      await user.save();
      return true;
    }

    throw new UnauthorizedException('You are not authorized');
  }

  async getDiskSpace(id: string) {
    const user = await this.userModel.findById(id).lean();

    if (user) {
      return { diskQuota: user.diskQuota, usedSpace: user.usedSpace };
    }

    throw new UnauthorizedException('You are not authorized');
  }
}
