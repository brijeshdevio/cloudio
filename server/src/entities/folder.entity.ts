import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({ timestamps: true })
export class Folder {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  owner: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Folder', default: null })
  parent: Types.ObjectId | null;

  @Prop({ type: [Types.ObjectId], ref: 'Folder', default: [] })
  path: Types.ObjectId[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);

FolderSchema.pre('save', async function (this: FolderDocument) {
  if (!this.parent) {
    this.path = [];
    return; // async hooks return instead of next()
  }

  const parentFolder = (await this.model('Folder').findById(
    this.parent,
  )) as FolderDocument;

  if (parentFolder) {
    this.path = [...parentFolder.path, parentFolder._id];
  } else {
    this.path = [];
  }
});
