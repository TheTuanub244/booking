import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './property.schema';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
  ]
})
export class PropertyModule { }
