import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TipoUsuario } from '@prisma/client';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Tokens } from '@/auth/interfaces/tokens.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(
    userId: string,
    role: TipoUsuario,
    perfilId: string | null,
  ): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: userId,
      tipoUsuario: role,
      perfilId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('EXPIRATION_TIME_ACESS_TOKEN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('EXPIRATION_TIME_REFRESH_TOKEN'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
