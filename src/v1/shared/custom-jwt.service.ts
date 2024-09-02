import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IJWTSigner } from '@/core/shared/jwt-signer.service';

@Injectable()
export class CustomJwtService implements IJWTSigner {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: object): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async verify<T extends object = any>(token: string): Promise<T> {
    return await this.jwtService.verifyAsync(token);
  }
}
