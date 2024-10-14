import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Room } from 'src/room/room.schema';
import { User } from 'src/user/user.schema';
import { BookingStatus } from './enum/bookingStatus.enum';
import { PaymentStatus } from './enum/paymentStatus.enum';

@Schema()
export class Booking {
    @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'User' })
    user_id: User;
    @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Room' })
    room_id: Room;
    @Prop({ required: true, type: Date })
    check_in_date: Date;
    @Prop({ required: true, type: Date })
    check_out_date: Date;
    @Prop({ required: true })
    total_price: number;
    @Prop({ required: true, enum: BookingStatus })
    booking_status: BookingStatus;
    @Prop({ required: true, enum: PaymentStatus })
    payment_status: PaymentStatus;
}
