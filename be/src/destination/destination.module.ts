import { Module } from '@nestjs/common';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Destination, DestinationSchema } from './destination.schema';

@Module({
  controllers: [DestinationController],
  providers: [DestinationService],
  imports: [
    MongooseModule.forFeature([{
      name: Destination.name,
      schema: DestinationSchema,
    }]),
  ],
})
export class DestinationModule { }
