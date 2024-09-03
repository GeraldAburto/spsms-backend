import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedUser } from 'auth';
import { Request } from 'express';

import { CustomJwtService } from '../shared/custom-jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: CustomJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verify<{
        sub: string;
        username: string;
      }>(token);
      request['user'] = {
        id: payload.sub,
        email: payload.username,
      } as AuthenticatedUser;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
