import { Body, Controller, Get, HttpException } from '@nestjs/common';
import {
  ClosestAsteroidRequestDto,
  ClosestAsteroidResponseDto,
} from './dto/closest-asteroid.dto';
import { NeoWsService } from './neows/neows.service';
@Controller()
export class AppController {
  constructor(private readonly neoWsService: NeoWsService) {}

  @Get()
  async getAsteroids(
    @Body() request: ClosestAsteroidRequestDto,
  ): Promise<ClosestAsteroidResponseDto> {
    const { start_date, end_date } = request;
    const result = await this.neoWsService.queryAsteroids(start_date, end_date);

    if (result.err) throw new HttpException(result.val.message, 500);

    // TODO: response
    const response: ClosestAsteroidResponseDto =
      {} as ClosestAsteroidResponseDto;

    return response;
  }
}
