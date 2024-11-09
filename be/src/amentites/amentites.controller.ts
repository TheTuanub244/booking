import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AmentitesService } from './amentites.service';

@Controller('amentites')
export class AmentitesController {
  constructor(private readonly amentitiesSerivce: AmentitesService) {}
  @Post('/createAmentites')
  async createAmentity(@Body() createAmentites: any) {
    return this.amentitiesSerivce.createAmentites(createAmentites);
  }
}
