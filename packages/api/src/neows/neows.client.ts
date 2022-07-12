import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, retry } from 'rxjs';
import { Err, Ok } from 'ts-results';
import { NeoWsResponse } from './interfaces/neows.inteface';
import { SharedAsyncResult } from '../shared/type/shared-results.type';

@Injectable()
export class NeoWsClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async query(
    startDate: Date,
    endDate: Date,
  ): SharedAsyncResult<NeoWsResponse> {
    const queryURL = this.getQueryURL(startDate, endDate);
    let result;
    try {
      Logger.log(
        `Querying range: ${startDate.toISOString().split('T')[0]} -> ${
          endDate.toISOString().split('T')[0]
        }`,
      );

      result = await firstValueFrom(
        this.httpService.get<NeoWsResponse>(queryURL).pipe(retry(3)), // The NeoWS API seems to be quite prone to errors (it's hosted in heroku), thus we have retry logic here
      );
      return Ok(result.data);
    } catch (error) {
      const errorMessage = 'Querying NeoWs API failed';

      Logger.error(errorMessage, {
        error,
        startDate,
        endDate,
      });

      return Err({
        message: errorMessage,
        error,
      });
    }
  }

  private getQueryURL(startDate: Date, endDate: Date) {
    const apiKey = this.configService.get<string>('NASA_API_KEY');
    // Convert Dates to ISO timestamps with only the date
    const [startTimestamp, endTimestamp] = [startDate, endDate].map(
      (date) => date.toISOString().split('T')[0],
    );
    return `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startTimestamp}&end_date=${endTimestamp}&api_key=${apiKey}`;
  }
}
