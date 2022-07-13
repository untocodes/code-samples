import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Ok } from 'ts-results';
import { NeoWsNearEarthObjectFactory } from './factories/near-earth-object.factory';
import { ClosestAsteroidDtoMapper } from './mappers/closest-asteroid-dto.mapper';
import { NeoWsQueryCommand } from './neows/commands/neows-query.command';
import { NeoWsModule } from './neows/neows.module';
import { NeoWsService } from './neows/neows.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController;
  let neoWsService;
  let closestAsteroidDtoMapper;

  const mockNearEarthObject = NeoWsNearEarthObjectFactory.build();
  const dateStamps = ['2019-12-01', '2022-02-02'];
  const dates = dateStamps.map((date) => new Date(date));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, NeoWsModule],
      controllers: [AppController],
      providers: [ClosestAsteroidDtoMapper, NeoWsQueryCommand],
      exports: [],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    neoWsService = moduleRef.get<NeoWsService>(NeoWsService);
    closestAsteroidDtoMapper = moduleRef.get<ClosestAsteroidDtoMapper>(
      ClosestAsteroidDtoMapper,
    );
  });

  describe('/get-closest-neo (getAsteroids())', () => {
    it('should call expected functions', async () => {
      const neoWsServiceSpy = jest
        .spyOn(neoWsService, 'queryClosestAsteroid')
        .mockReturnValue(Ok(mockNearEarthObject));

      const dtoMapperSpy = jest.spyOn(
        closestAsteroidDtoMapper,
        'toClosestAsteroidResponseDto',
      );

      const result = await appController.getAsteroids({
        start_date: dates[0],
        end_date: dates[1],
      });

      expect(result).toEqual(
        closestAsteroidDtoMapper.toClosestAsteroidResponseDto(
          mockNearEarthObject,
        ),
      );
      expect(neoWsServiceSpy).toBeCalled();
      expect(dtoMapperSpy).toBeCalled();
    });
  });
});
