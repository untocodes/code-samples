import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Err, Ok } from 'ts-results';
import { NeoWsResponse } from './interfaces/neows.inteface';
import { SharedAsyncResult } from '../shared/shared-results.type';

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
    try {
      const result = await firstValueFrom(
        this.httpService.get<NeoWsResponse>(queryURL),
      );

      return Ok(result.data);
    } catch (error) {
      const errorMessage = 'Querying NeoWs API failed';

      Logger.error(errorMessage, {
        error,
      });

      return Err({
        message: errorMessage,
        error,
      });
    }
  }

  private getQueryURL(startDate: Date, endDate: Date) {
    const apiKey = this.configService.get<string>('NASA_API_KEY');
    // Convert Date's to ISO timestamps
    const [startTimestamp, endTimestamp] = [startDate, endDate].map((date) =>
      date.toISOString(),
    );
    return `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startTimestamp}&end_date=${endTimestamp}&api_key=${apiKey}`;
  }
}
