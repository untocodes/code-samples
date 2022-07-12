import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ClosestAsteroidRequestDto,
  ClosestAsteroidResponseDto,
} from '../../lib/dto/closest-asteroid.dto';
import { ClosestAsteroidDtoMapper } from './mappers/closest-asteroid-dto.mapper';
import { NeoWsNearEarthObject } from './neows/interfaces/neows.inteface';
import { NeoWsService } from './neows/neows.service';

@ApiTags('Asteroids')
@Controller()
export class AppController {
  constructor(
    private readonly neoWsService: NeoWsService,
    private readonly closestAsteroidDtoMapper: ClosestAsteroidDtoMapper,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Querying NeoWs API went successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid query' })
  @ApiResponse({ status: 500, description: 'Querying NeoWs API failed' })
  async getAsteroids(
    @Body() request: ClosestAsteroidRequestDto,
  ): Promise<ClosestAsteroidResponseDto> {
    const { start_date, end_date } = request;
    const result = await this.neoWsService.queryClosestAsteroid(
      start_date,
      end_date,
    );

    if (result.err) throw new HttpException(result.val.message, 500);

    const nearEarthObject = result.val as NeoWsNearEarthObject;

    return this.closestAsteroidDtoMapper.toClosestAsteroidResponseDto(
      nearEarthObject,
    );
  }
}
