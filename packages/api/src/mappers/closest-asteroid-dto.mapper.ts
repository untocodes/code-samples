import { Injectable } from '@nestjs/common';
import { NeoWsNearEarthObject } from 'src/neows/interfaces/neows.inteface';

@Injectable()
export class ClosestAsteroidDtoMapper {
  public toClosestAsteroidResponseDto(nearEarthObject: NeoWsNearEarthObject) {
    const { id, name } = nearEarthObject;
    return {
      id,
      name,
      nasa_url: nearEarthObject.nasa_jpl_url,
      estimated_diameter_km: {
        min: nearEarthObject.estimated_diameter.kilometers
          .estimated_diameter_min,
        max: nearEarthObject.estimated_diameter.kilometers
          .estimated_diameter_max,
      },
      miss_distance_km:
        nearEarthObject.close_approach_data[0].miss_distance.kilometers,
    };
  }
}
