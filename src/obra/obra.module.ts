import { Module } from '@nestjs/common';
import { ObraController } from './obra.controller';
import { ObraService } from './obra.service';
import { ObraRepository } from './obra.repository';

@Module({
  controllers: [ObraController],
  providers: [ObraService, ObraRepository],
})
export class ObraModule {}
