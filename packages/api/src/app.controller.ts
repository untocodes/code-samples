import { Controller, Get } from '@nestjs/common';
import { NeoWsNearEarthObject } from './neows/interfaces/neows.inteface';
import { NeoWsService } from './neows/neows.service';
@Controller()
export class AppController {
  constructor(private readonly neoWsService: NeoWsService) {}

  @Get()
  async getSatellites(): Promise<Record<string, NeoWsNearEarthObject[]>> {
    return await this.neoWsService.querySatellites(
      new Date('2022-05-01'),
      new Date('2022-06-07'),
    );
  }
}
