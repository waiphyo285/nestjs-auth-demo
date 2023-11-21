import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import JwtDecode from 'jwt-decode';

@Injectable()
export class ModifyRequest implements NestMiddleware {
  async use(req: any, res: any, next: NextFunction) {
    if (req.headers.authorization) {
      const [_, token] = req.headers.authorization?.split(' ') ?? [];
      const decoded: any = JwtDecode(token);
      req.query._user = decoded;
    }
    next();
  }
}
