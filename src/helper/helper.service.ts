import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable()
export class Helper {
  constructor(@Inject(REQUEST) private readonly request: any) {}

  createJWTSignedToken(data, key, algorithm = 'HS256') {
    const config = { algorithm, expiresIn: '5d' };
    return jwt.sign(data, key, config);
  }
  getToken(): User {
    return this.request.context.token;
  }

  // functionCaller<functionType, functionParams>(
  //   functionToBeCalled: functionType,
  //   functionParams: functionParams,
  // ) {
  //   try {
  //   } catch (e) {}
  // }
}

export type excludedFields = 'id' | 'createdAt' | 'updatedAt';
