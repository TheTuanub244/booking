import mongoose from 'mongoose';
import { Property } from 'src/property/property.schema';
import { TYPE } from './enum/type.enum';
export declare class Room {
  property_id: Property;
  type: TYPE;
  images: string[];
  size: number;
  name: string;
  price_per_night: {
    weekday: number;
    weekend: number;
  };
  capacity: {
    adults: number;
    childs: {
      count: number;
      age: number;
    };
  };
  facility: string[];
  rating: number;
}
export declare const RoomSchema: mongoose.Schema<
  Room,
  mongoose.Model<
    Room,
    any,
    any,
    any,
    mongoose.Document<unknown, any, Room> &
      Room & {
        _id: mongoose.Types.ObjectId;
      } & {
        __v?: number;
      },
    any
  >,
  {},
  {},
  {},
  {},
  mongoose.DefaultSchemaOptions,
  Room,
  mongoose.Document<unknown, {}, mongoose.FlatRecord<Room>> &
    mongoose.FlatRecord<Room> & {
      _id: mongoose.Types.ObjectId;
    } & {
      __v?: number;
    }
>;
