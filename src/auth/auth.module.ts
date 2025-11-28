import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from '@/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@/commom/guards/auth.guard';
import { TokenModule } from '@/token/token.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TokenModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaModule],
})
export class AuthModule {}
