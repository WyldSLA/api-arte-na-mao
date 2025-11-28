import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token) throw new UnauthorizedException('É necessário informar o token.');

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET')
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Token expirado.');
        }

        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const authHeader = request.headers['authorization'] || request.headers['Authorization'];
        const [type, token] = authHeader?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
