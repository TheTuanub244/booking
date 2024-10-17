import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';

@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) { }
    @Post('createBooking')
    async createBooking(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.createBooking(createBookingDto)
    }
}
