import { Injectable } from '@nestjs/common';
import {
  NeoWsNearEarthObject,
  NeoWsResponse,
} from './interfaces/neows.inteface';
import { NeoWsClient } from './neows.client';
import { splitDateRange } from '../shared/util/split-daterange.util';
import { SharedAsyncResult } from 'src/shared/type/shared-results.type';
import { Ok } from 'ts-results';
@Injectable()
export class NeoWsService {
  constructor(private readonly neoWsClient: NeoWsClient) {}
  // TODO: convert to provide closest asteroid
  async queryAsteroids(
    startDate: Date,
    endDate: Date,
  ): SharedAsyncResult<Record<string, NeoWsNearEarthObject[]>> {
    const ranges = splitDateRange(startDate, endDate, 7); // Split to 7 day date ranges

    let values: Record<string, NeoWsNearEarthObject[]>;
    // TODO: convert to async
    for (const range of ranges) {
      const { startDate, endDate } = range;
      const result = await this.neoWsClient.query(startDate, endDate);
      if (result.err) return result;
      const res = result.val as NeoWsResponse;
      // Combine records to add new data
      values = { ...values, ...res.near_earth_objects };
    }

    return Ok(values);
  }
}
