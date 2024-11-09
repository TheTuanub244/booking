import { Body, Controller, Post } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/createDestionation.dto';
import { UpdateDestinationDto } from './dto/updateDestination.dto';

@Controller('destination')
export class DestinationController {
  constructor(private destinationService: DestinationService) {}
  @Post('/create-destination')
  createDestination(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.create(createDestinationDto);
  }

  @Post('/update-destination')
  updateDestination(@Body() updateDestinationDto: UpdateDestinationDto) {
    return this.destinationService.update(updateDestinationDto);
  }
  @Post('/delete-destination')
  deleteDestination(@Body() id: string) {
    return this.destinationService.delete(id);
  }
}
