import { Factory } from 'fishery';
import {
  NeoWsDiameterMinMax,
  NeoWsNearEarthObject,
} from '../neows/interfaces/neows.inteface';
import { faker } from '@faker-js/faker';

const NeoWsDiameterMinMaxFactory = Factory.define<NeoWsDiameterMinMax>(() => ({
  estimated_diameter_max: faker.datatype.float(),
  estimated_diameter_min: faker.datatype.float(),
}));

export const NeoWsNearEarthObjectFactory = Factory.define<NeoWsNearEarthObject>(
  ({ sequence }) => ({
    id: sequence.toString(),
    name: faker.name.firstName(),
    links: [],
    neo_reference_id: sequence.toString(),
    nasa_jpl_url: faker.datatype.string(),
    absolute_magnitude_h: faker.datatype.float(),
    close_approach_data: [
      {
        close_approach_date: faker.datatype.datetime().toISOString(),
        close_approach_date_full: faker.datatype.datetime().toISOString(),
        epoach_date_close_approach: faker.datatype.number(),
        miss_distance: {
          astronomical: faker.datatype.float().toString(),
          lunar: faker.datatype.float().toString(),
          kilometers: faker.datatype.float().toString(),
          miles: faker.datatype.float().toString(),
        },
        relative_velocity: {
          kilometers_per_hour: faker.datatype.number().toString(),
          kilometers_per_second: faker.datatype.number().toString(),
          miles_per_hour: faker.datatype.number().toString(),
        },
        orbiting_body: 'Earth',
      },
    ],
    estimated_diameter: {
      kilometers: NeoWsDiameterMinMaxFactory.build(),
      meters: NeoWsDiameterMinMaxFactory.build(),
      miles: NeoWsDiameterMinMaxFactory.build(),
      feet: NeoWsDiameterMinMaxFactory.build(),
    },
  }),
);
