import { Prisma, User } from '@prisma/client';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Helper } from '../../helper/helper.service';
import { LoginInput, PropertyInput } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private helper: Helper,
  ) {}
  async login(body: LoginInput) {
    try {
      const { email, password } = body;
      const userClause: Prisma.UserWhereUniqueInput = { email };
      const user = await this.prisma.user.findUnique({
        where: userClause,
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Password is invalid');
      }

      const userWithoutPass = this.helper.excludeSensitiveFields(user, [
        'password',
      ]);

      const token = this.helper.createJWTSignedToken(userWithoutPass);
      return { data: userWithoutPass, token };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async register(body: Prisma.UserUncheckedCreateInput) {
    const { email, password } = body;
    const existingUserClause = { email };
    const existingUser = await this.prisma.user.findUnique({
      where: existingUserClause,
    });
    if (existingUser) {
      throw new HttpException('User already exists', 403);
    }
    let user: User;
    try {
      body.password = await bcrypt.hash(password, 10);
      user = await this.prisma.user.create({
        data: body,
      });
    } catch (error) {
      throw new HttpException('Server error', 500);
    }
    delete user.password;
    const token: string = this.helper.createJWTSignedToken(user);
    return { data: user, token };
  }

  async getProperty({ property }: PropertyInput) {
    const token = this.helper.getToken();
    const user = await this.prisma.user.findUnique({
      where: { id: token.id },
      select: { [property]: true, password: false },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user[property]) {
      throw new NotFoundException('Property not found');
    }
    return user[property];
  }

  async sendVerificationEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    try {
      const token = this.helper.createJWTSignedToken(user);
      const url = `http://localhost:3000/auth/verify?token=${token}`;
      // await this.mailService.sendMail(email, 'Verify your email', url);
      return { sent: true };
    } catch (error) {
      console.log(error);
      return { sent: false };
    }
  }

  async verify(token) {
    let verified = false;
    try {
      const { id } = this.helper.verifyToken(token);
      await this.prisma.user.update({
        where: { id },
        data: { isEmailVerified: true },
      });
      verified = true;
    } catch (error) {
      verified = false;
    }
    return { verified };
  }
}
