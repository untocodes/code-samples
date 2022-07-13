import { Factory } from 'fishery';
import { NeoWsResponse } from '../neows/interfaces/neows.inteface';
import { NeoWsNearEarthObjectFactory } from './near-earth-object.factory';

export const NeoWsResponseFactory = Factory.define<NeoWsResponse>(() => ({
  links: [],
  element_count: 2,
  near_earth_objects: {
    '2022-01-01': [NeoWsNearEarthObjectFactory.build()],
    '2022-01-02': [NeoWsNearEarthObjectFactory.build()],
  },
}));
