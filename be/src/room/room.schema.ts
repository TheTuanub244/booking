import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Property } from "src/property/property.schema";
import { TYPE } from "./enum/type.enum";

@Schema()
export class Room {
    @Prop({ require: true, unique: true, type: mongoose.Schema.ObjectId, ref: 'Property' })
    property_id: Property
    @Prop({ required: true, enum: TYPE })
    type: TYPE
    @Prop({ required: true })
    price_per_nigh: number
    @Prop({ required: true })
    availability: number
    @Prop({ required: true })
    capacity: number
}