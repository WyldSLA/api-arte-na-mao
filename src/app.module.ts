import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { TokenModule } from './token/token.module';
import { ObraModule } from './obra/obra.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    TokenModule,
    ObraModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
