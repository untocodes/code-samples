import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Ok } from 'ts-results';
import { NeoWsResponseFactory } from '../factories/neows-response.factory';
import { NeoWsClient } from './neows.client';
import { NeoWsModule } from './neows.module';
import { NeoWsService } from './neows.service';

describe('NeoWsService', () => {
  let neoWsService;
  let neoWsClient;

  const mockNeoWsResponse = NeoWsResponseFactory.build();

  const dateStamps = ['2019-12-01', '2022-02-02'];
  const dates = dateStamps.map((date) => new Date(date));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, NeoWsModule],
      controllers: [],
      providers: [],
      exports: [],
    }).compile();
    neoWsClient = moduleRef.get<NeoWsClient>(NeoWsClient);
    neoWsService = new NeoWsService(neoWsClient);
  });

  describe('queryClosestAsteroid()', () => {
    it('verify that all the required calls are made', async () => {
      const neoWsClientSpy = jest
        .spyOn(neoWsClient, 'query')
        .mockReturnValue(Ok(mockNeoWsResponse));

      await neoWsService.queryClosestAsteroid(dates[0], dates[1]);

      const epocDiff = dates[1].getTime() - dates[0].getTime();
      const days = Math.ceil(epocDiff / (1000 * 3600 * 24));
      const runs = days / 7;

      expect(neoWsClientSpy).toBeCalledTimes(Math.ceil(runs));
    });
  });
});
