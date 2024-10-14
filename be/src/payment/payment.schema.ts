import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Booking } from "src/booking/booking.schema";
import { PaymentMethod } from "./enum/paymentMethod.enum";
import { PaymentStatus } from "./enum/paymentStatus.enum";

@Schema()
export class Payment {
    @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Booking' })
    booking_id: Booking
    @Prop({ required: true })
    amount: number
    @Prop({ required: true, enum: PaymentMethod })
    payment_method: PaymentMethod
    @Prop({ required: true, enum: PaymentStatus })
    payment_status: PaymentStatus
}