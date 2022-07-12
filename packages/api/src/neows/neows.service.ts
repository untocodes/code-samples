import { Injectable } from '@nestjs/common';
import {
  NeoWsNearEarthObject,
  NeoWsResponse,
} from './interfaces/neows.inteface';
import { NeoWsClient } from './neows.client';
import { splitDateRange } from '../util/split-daterange.util';
@Injectable()
export class NeoWsService {
  constructor(private readonly neoWsClient: NeoWsClient) {}
  async querySatellites(
    startDate: Date,
    endDate: Date,
  ): Promise<Record<string, NeoWsNearEarthObject[]>> {
    const ranges = splitDateRange(startDate, endDate, 7); // Split to 7 day date ranges
    let values: Record<string, NeoWsNearEarthObject[]>;

    for (const range of ranges) {
      const { startDate, endDate } = range;
      const result = await this.neoWsClient.query(startDate, endDate);
      if (result.err) throw result.val;
      const res = result.val as NeoWsResponse;
      // Combine records to add new data
      values = { ...values, ...res.near_earth_objects };
    }
    return values;
  }
}
