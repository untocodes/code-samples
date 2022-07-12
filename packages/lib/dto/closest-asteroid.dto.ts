import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ClosestAsteroidRequestDto {
  @ApiProperty({
    description: "Start date for lookup",
  })
  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @ApiProperty({
    description: "End date for lookup",
  })
  @ApiProperty()
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
  estimated_diameter_km: {
    min: number;
    max: number;
  };

  @IsString()
  @IsNotEmpty()
  miss_distance_km: string;
}
