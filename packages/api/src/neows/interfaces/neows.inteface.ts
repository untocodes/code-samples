export interface NeoWsNearEarthObject {
  links: string[];
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
}

export interface NeoWsResponse {
  links: string[];
  element_count: number;
  near_earth_objects: Record<string, NeoWsNearEarthObject[]>;
}
