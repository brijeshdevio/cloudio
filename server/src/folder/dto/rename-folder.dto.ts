import { IsNotEmpty, IsString } from 'class-validator';

export class RenameFolderDto {
  @IsString({ message: 'Folder name must be a string' })
  @IsNotEmpty({ message: 'Folder name must not be empty' })
  name: string;
}
