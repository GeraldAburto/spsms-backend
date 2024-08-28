import { IJWTSigner } from '@/core/shared/jwt-signer.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService implements IJWTSigner {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: object): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
