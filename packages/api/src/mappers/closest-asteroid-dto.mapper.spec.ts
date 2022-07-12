import { ClosestAsteroidDtoMapper } from './closest-asteroid-dto.mapper';
import { NeoWsNearEarthObjectFactory } from '../factories/near-earth-object.factory';
describe('ClosestAsteroidDtoMapper', () => {
  const closestAsteroidDtoMapper = new ClosestAsteroidDtoMapper();

  describe('toClosestAsteroidResponseDto()', () => {
    const nearEarthObject = NeoWsNearEarthObjectFactory.build();

    it('should return data mapped to the expected format', () => {
      const result =
        closestAsteroidDtoMapper.toClosestAsteroidResponseDto(nearEarthObject);
      expect(result).toEqual({
        id: nearEarthObject.id,
        estimated_diameter_km: {
          max: nearEarthObject.estimated_diameter.kilometers
            .estimated_diameter_max,
          min: nearEarthObject.estimated_diameter.kilometers
            .estimated_diameter_min,
        },
        miss_distance_km:
          nearEarthObject.close_approach_data[0].miss_distance.kilometers,
        name: nearEarthObject.name,
        nasa_url: nearEarthObject.nasa_jpl_url,
      });
    });
  });
});
