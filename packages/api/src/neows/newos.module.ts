import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NeoWsClient } from './neows.client';
import { NeoWsService } from './neows.service';

@Module({
  imports: [HttpModule],
  providers: [NeoWsClient, NeoWsService],
  exports: [NeoWsService],
})
export class NeoWsModule {}
