import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Number, default: 0 })
  usedSpace: number;

  // 500 * 1024 * 1024 = 524288000 bytes
  @Prop({ type: Number, default: 524288000 }) // 500 MB default quota
  diskQuota: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
