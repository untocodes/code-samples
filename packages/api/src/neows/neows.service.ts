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
  private async queryAsteroids(
    startDate,
    endDate,
  ): SharedAsyncResult<Record<string, NeoWsNearEarthObject[]>> {
    const result = await this.neoWsClient.query(startDate, endDate);
    if (result.err) return result;

    const res = result.val as NeoWsResponse;

    // Combine records to add new data
    return Ok(res.near_earth_objects);
  }

  async queryClosestAsteroid(
    startDate: Date,
    endDate: Date,
  ): SharedAsyncResult<NeoWsNearEarthObject> {
    const ranges = splitDateRange(startDate, endDate, 7); // Split to 7 day date ranges

    let values: Record<string, NeoWsNearEarthObject[]>;

    // Batch requests, only send 20 requests at a time
    const batchSize = 20;
    for (
      let i = 0;
      i < Object.values(ranges).length + batchSize;
      i += batchSize
    ) {
      const results = await Promise.all(
        ranges
          .slice(i, i + batchSize)
          .map((range) => this.queryAsteroids(range.startDate, range.endDate)),
      );

      for (const result of results) {
        if (result.err) return result;
        else {
          const nearEarthObjects = result.val as Record<
            string,
            NeoWsNearEarthObject[]
          >;
          values = { ...values, ...nearEarthObjects };
        }
      }
    }

    // Find the one with the samllest miss_distance from earth
    let minDistance;
    let maxDistanceKey = '';

    for (const key in values) {
      const missDistance = Number(
        values[key][0].close_approach_data[0].miss_distance.kilometers,
      );
      if (minDistance === undefined || missDistance < minDistance) {
        minDistance = missDistance;
        maxDistanceKey = key;
      }
    }
    return Ok(values[maxDistanceKey][0]);
  }
}
