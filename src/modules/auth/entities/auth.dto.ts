import { User, UserRole } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

type LoginInputInterface = Pick<User, 'email' | 'password'>;

export class LoginInput implements LoginInputInterface {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterInput {
  email: string;
  password: string;
  name: string;
  mobile: string;
  role: UserRole = UserRole.SUPER_ADMIN;
  collegeId: string;
}

export class PropertyInput {
  @IsString()
  property: string;
}
