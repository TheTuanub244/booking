import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Property } from 'src/property/property.schema';
import { TYPE } from './enum/type.enum';

@Schema()
export class Room {
  @Prop({
    require: true,
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
  @Prop({

    required: true, _id: false, type: {
      weekday: Number,
      weekend: Number,
    }
  })
  price_per_night: {
    weekday: number;
    weekend: number;
  };
  @Prop({
    required: true,
    _id: false,
    type: {
      adults: {
        type: Number,
      },
      childs: {
        count: Number,
        age: Number,
      },
      room: {
        type: Number,
      },
    },
  })
  capacity: {
    adults: number;
    childs: {
      count: number;
      age: number;
    };
    room: number;
  };
  @Prop({ type: [String] })
  facility: string[];
  @Prop({})
  rating: number;
}
export const RoomSchema = SchemaFactory.createForClass(Room);
