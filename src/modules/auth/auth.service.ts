import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Helper } from '../../helper/helper.service';
import { LoginInput, PropertyInput } from './entities/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private helper: Helper) {}
  async login(body: LoginInput) {
    const response = {
      code: 400,
      message: '',
    };
    const { email, password } = body;
    const userClause: Prisma.UserWhereUniqueInput = { email };
    const user = await this.prisma.user.findUnique({ where: userClause });
    if (!user) {
      response.code = 401;
      response.message = 'User not found';
      throw response;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      response.code = 401;
      response.message = 'Password is invalid';
      throw response;
    }
    delete user.password;
    const token = this.helper.createJWTSignedToken(
      user,
      process.env.SECRET_KEY,
    );
    return {
      data: user,
      token,
    };
  }

  async register(body: Prisma.UserUncheckedCreateInput) {
    const response = {
      message: {},
      code: 200,
    };
    const { email, password } = body;
    const existingUserClause = { email };
    const existingUser = await this.prisma.user.findUnique({
      where: existingUserClause,
    });
    if (existingUser) {
      response.message = 'User already exists';
      response.code = 403;
      throw response;
    }
    body.password = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: body,
    });
    delete user.password;
    const token: string = this.helper.createJWTSignedToken(
      user,
      process.env.SECRET_KEY,
    );
    delete user.password;
    return { data: user, token };
  }
  async getProperty({ property }: PropertyInput) {
    console.log(property);
    const token = this.helper.getToken();
    const user = await this.prisma.user.findUnique({
      where: { id: token.id },
      select: { [property]: true, password: false },
    });
    return user[property];
  }
}
