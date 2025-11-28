import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TipoUsuario } from '@prisma/client';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  
  async generateToken(userId: string, role: TipoUsuario, profileId: string | null): Promise<string> {
    const payload: JwtPayload = {
      sub: userId,
      role,
      profileId
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }
}
