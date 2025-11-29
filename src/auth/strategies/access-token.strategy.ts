import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') as string,
    });
  }

  async validate(payload: JwtPayload) {
    if (
      payload.tipoUsuario !== 'CLIENTE' &&
      payload.tipoUsuario !== 'ARTISTA'
    ) {
      throw new UnauthorizedException('Tipo de usuário inválido.');
    }
    return {
      userId: payload.sub,
      tipoUsuario: payload.tipoUsuario,
      perfilId: payload.perfilId,
    };
  }
}
