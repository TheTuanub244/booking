import mongoose from 'mongoose';
import { Booking } from 'src/booking/booking.schema';
import { PaymentMethod } from './enum/paymentMethod.enum';
import { PaymentStatus } from './enum/paymentStatus.enum';
export declare class Payment {
    booking_id: Booking;
    amount: number;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
}
export declare const PaymentSchema: mongoose.Schema<Payment, mongoose.Model<Payment, any, any, any, mongoose.Document<unknown, any, Payment> & Payment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Payment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Payment>> & mongoose.FlatRecord<Payment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}>;