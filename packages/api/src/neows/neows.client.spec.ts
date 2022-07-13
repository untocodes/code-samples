import { HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { NeoWsClient } from './neows.client';
import { NeoWsModule } from './neows.module';

describe('NeoWsClient', () => {
  let neoWsClient;
  let httpService;
  let configService;

  const mockApiKey = 'MOCK-API-KEY';
  const dateStamps = ['2022-02-01', '2022-02-02'];
  const dates = dateStamps.map((date) => new Date(date));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, NeoWsModule],
      controllers: [],
      providers: [],
      exports: [],
    }).compile();
    configService = moduleRef.get<ConfigService>(ConfigService);
    httpService = moduleRef.get<HttpService>(HttpService);
    neoWsClient = moduleRef.get<NeoWsClient>(NeoWsClient);
  });

  describe('query()', () => {
    it('verify that HttpService gets called with the correct URL', async () => {
      const configServiceSpy = jest
        .spyOn(configService, 'get')
        .mockImplementation(() => mockApiKey);
      const httpServiceSpy = jest
        .spyOn(httpService, 'get')
        .mockResolvedValue(() => Promise.resolve({}));

      await neoWsClient.query(dates[0], dates[1]);
      expect(configServiceSpy).toBeCalled();
      expect(httpServiceSpy).toBeCalled();
      expect(httpServiceSpy.mock.calls[0][0]).toEqual(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateStamps[0]}&end_date=${dateStamps[1]}&api_key=${mockApiKey}`,
      );
    });
  });
});
