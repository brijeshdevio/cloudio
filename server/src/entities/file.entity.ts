import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  mimeType: string;

  @Prop({ type: Number })
  size: number;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  owner: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Folder', default: null })
  folder: Types.ObjectId | null;

  @Prop({ type: String, required: true })
  secureUrl: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
