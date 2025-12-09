import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString({ message: 'Folder name must be a string' })
  @IsNotEmpty({ message: 'Folder name must not be empty' })
  name: string;

  @IsMongoId()
  @IsOptional({ message: 'Parent is optional' })
  parent?: string;
}
