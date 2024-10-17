import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Booking } from "src/booking/booking.schema";
import { User } from "src/user/user.schema";
import { TYPE } from "./enum/type.enum";

@Schema()
export class Review {
    @Prop({ require: true, type: mongoose.Schema.ObjectId, ref: 'User' })
    user_id: User
    @Prop({ require: true, type: mongoose.Schema.ObjectId, ref: 'Property' })
    property_id: Booking

    @Prop({ required: true })
    rating: number
    @Prop({ required: true })
    review_text: string
    @Prop({ enum: TYPE })
    review_type: TYPE


}
export const ReviewSchema = SchemaFactory.createForClass(Review);
