import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({ timestamps: true })
export class Folder {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  owner: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Folder' })
  parent: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Folder' })
  path: Types.ObjectId[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
