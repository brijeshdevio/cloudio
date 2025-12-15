import { IsString } from 'class-validator';

export class RenameFileDto {
  @IsString({ message: 'New name must be a string' })
  newName: string;
}
