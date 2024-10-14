import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Booking } from "src/booking/booking.schema";
import { User } from "src/user/user.schema";

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

}