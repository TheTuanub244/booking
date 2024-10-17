import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './booking.schema';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/createBooking.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingSchema: Model<Booking>
    ) { }
    async createBooking(createBookingDto: CreateBookingDto) {
        console.log(createBookingDto);

    }
}
