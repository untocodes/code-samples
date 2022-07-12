import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClosestAsteroidDtoMapper } from 'src/mappers/closest-asteroid-dto.mapper';
import { NeoWsQueryCommand } from './commands/neows-query.command';
import { NeoWsClient } from './neows.client';
import { NeoWsService } from './neows.service';

@Module({
  imports: [HttpModule],
  providers: [
    NeoWsClient,
    NeoWsService,
    NeoWsQueryCommand,
    ClosestAsteroidDtoMapper,
  ],
  exports: [NeoWsService, NeoWsQueryCommand],
})
export class NeoWsModule {}
