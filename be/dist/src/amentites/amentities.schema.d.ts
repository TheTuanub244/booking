import mongoose from 'mongoose';
import { Property } from 'src/property/property.schema';
import { Room } from 'src/room/room.schema';
export declare class Amentites {
    amentity_name: string;
    property: Property[];
    room: Room[];
}
export declare const AmentitesSchema: mongoose.Schema<Amentites, mongoose.Model<Amentites, any, any, any, mongoose.Document<unknown, any, Amentites> & Amentites & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Amentites, mongoose.Document<unknown, {}, mongoose.FlatRecord<Amentites>> & mongoose.FlatRecord<Amentites> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}>;
