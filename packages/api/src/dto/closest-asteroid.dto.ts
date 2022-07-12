import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ClosestAsteroidRequestDto {
  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @Type(() => Date)
  @IsDate()
  end_date: Date;
}

export class ClosestAsteroidResponseDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  nasa_url: string;

  @IsString()
  @IsNotEmpty()
  estimated_diameter_km: string;

  @IsString()
  @IsNotEmpty()
  miss_distance_km: string;
}
