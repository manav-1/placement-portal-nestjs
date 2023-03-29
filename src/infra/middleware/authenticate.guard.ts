import * as jwt from 'jsonwebtoken';
// import * as httpContext from 'express-http-context';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../role/roles.decorator';
import { Role } from '../role/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { valid, token } = AuthGuard.validateRequest(request, requiredRoles);
    request.context = { token };
    return valid;
  }
  static validateRequest(
    req: Request,
    requiredRoles: Role[],
  ): { valid: boolean; token: any } {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) return { valid: false, token: null };
      const secretKey = process.env.SECRET_KEY;
      const decodedToken = jwt.verify(token, secretKey);
      const { role } = decodedToken;
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return { valid: false, token: null };
      }
      return { valid: true, token: decodedToken };
    } catch (e) {
      return { valid: false, token: null };
    }
  }
}
