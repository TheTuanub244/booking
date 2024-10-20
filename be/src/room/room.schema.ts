import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Property } from 'src/property/property.schema';
import { TYPE } from './enum/type.enum';

@Schema()
export class Room {
  @Prop({
    require: true,
    unique: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Property',
  })
  property_id: Property;
  @Prop({ required: true, enum: TYPE })
  type: TYPE;
  @Prop({ type: [String] })
  images: string[];
  @Prop({ required: true })
  size: number;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price_per_night: number;
  @Prop({
    required: true,
    type: {
      adults: {
        type: Number,
      },
      childs: {
        count: Number,
        age: Number,
      },
    },
  })
  capacity: {
    adults: number;
    childs: {
      count: number;
      age: number;
    };
  };
  @Prop({
    required: true,
    type: {
      check_in_date: {
        type: Date,
      },
      check_out_date: {
        type: Date,
      },
    },
  })
  availability: {
    check_in_date: Date;
    check_out_date: Date;
  };
  @Prop({ type: [String] })
  facility: string[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
