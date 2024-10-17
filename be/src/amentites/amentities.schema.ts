import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Property } from "src/property/property.schema";
import { Room } from "src/room/room.schema";

@Schema()
export class Amentites {
    @Prop({ required: true })
    amentity_name: string
    @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Property' }] })
    property: Property[]
    @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Room' }] })
    room: Room[]
}
export const AmentitesSchema = SchemaFactory.createForClass(Amentites);
