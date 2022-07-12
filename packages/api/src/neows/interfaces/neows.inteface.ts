export interface NeoWsCloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoach_date_close_approach: number;

  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };

  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };

  orbiting_body: string;
}

export interface NeoWsDiameterMinMax {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}
export interface NeoWsNearEarthObject {
  links: string[];
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  close_approach_data: NeoWsCloseApproachData[];
  estimated_diameter: {
    kilometers: NeoWsDiameterMinMax;
    meters: NeoWsDiameterMinMax;
    miles: NeoWsDiameterMinMax;
    feet: NeoWsDiameterMinMax;
  };
}

export interface NeoWsResponse {
  links: string[];
  element_count: number;
  near_earth_objects: Record<string, NeoWsNearEarthObject[]>;
}
