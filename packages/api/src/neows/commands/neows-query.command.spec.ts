import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ClosestAsteroidDtoMapper } from '../../mappers/closest-asteroid-dto.mapper';
import { NeoWsModule } from '../neows.module';
import { NeoWsService } from '../neows.service';
import { NeoWsQueryCommand } from './neows-query.command';
import { NeoWsNearEarthObjectFactory } from '../../factories/near-earth-object.factory';
import { Ok } from 'ts-results';

describe('NeoWsQueryCommand', () => {
  let neoWsQueryCommand;
  let neoWsService;
  let closestAsteroidDtoMapper;

  const mockNearEarthObject = NeoWsNearEarthObjectFactory.build();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, NeoWsModule],
      controllers: [],
      providers: [ClosestAsteroidDtoMapper, NeoWsQueryCommand],
      exports: [],
    }).compile();

    neoWsQueryCommand = moduleRef.get<NeoWsQueryCommand>(NeoWsQueryCommand);
    neoWsService = moduleRef.get<NeoWsService>(NeoWsService);
    closestAsteroidDtoMapper = moduleRef.get<ClosestAsteroidDtoMapper>(
      ClosestAsteroidDtoMapper,
    );
  });

  describe('run()', () => {
    it('should call expected functions', async () => {
      const neoWsServiceSpy = jest
        .spyOn(neoWsService, 'queryClosestAsteroid')
        .mockReturnValue(Ok(mockNearEarthObject));

      const dtoMapperSpy = jest.spyOn(
        closestAsteroidDtoMapper,
        'toClosestAsteroidResponseDto',
      );

      await neoWsQueryCommand.run(['2022-02-01', '2022-03-01']);

      expect(neoWsServiceSpy).toBeCalled();
      expect(dtoMapperSpy).toBeCalled();
    });
  });
});
