import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsNotEmpty,
} from 'class-validator';

export class SignupDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsStrongPassword(
    {},
    {
      message:
        'Password must be strong (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol)',
    },
  )
  password: string;
}
