import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as pg from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');
    
    const connectionPool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(connectionPool);

    super({ adapter });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
