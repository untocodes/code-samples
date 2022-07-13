import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { ClosestAsteroidDtoMapper } from '../../mappers/closest-asteroid-dto.mapper';
import { NeoWsNearEarthObject } from '../interfaces/neows.inteface';
import { NeoWsService } from '../neows.service';

@Command({
  name: 'neows-query',
  description: 'A parameter parse',
  arguments: '<startDate> <endDate>',
})
export class NeoWsQueryCommand implements CommandRunner {
  constructor(
    private readonly neoWsService: NeoWsService,
    private readonly closestAsteroidMapper: ClosestAsteroidDtoMapper,
  ) {}

  public async run(parameters: string[]): Promise<void> {
    try {
      const startTime = Date.now();

      const [startDate, endDate] = parameters.map(
        (timestamp) => new Date(timestamp),
      );

      const result = await this.neoWsService.queryClosestAsteroid(
        startDate,
        endDate,
      );
      if (result.err) throw new Error('Received error from neoWsService');

      Logger.log(
        'Received result from neoWsService:',
        this.closestAsteroidMapper.toClosestAsteroidResponseDto(
          result.val as NeoWsNearEarthObject,
        ),
      );
      Logger.log(`Time taken: ${(Date.now() - startTime) / 1000} seconds`);
    } catch (error) {
      Logger.error(error);
    }
  }
}
