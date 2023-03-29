import * as crypto from 'crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestId implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const reqId = crypto.randomUUID();
    res.setHeader('X-Request-Id', reqId);
    req.headers = { ...req.headers, 'X-Request-Id': reqId };
    next();
  }
}
