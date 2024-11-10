import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(createBookingDto: CreateBookingDto): Promise<import("mongoose").Document<unknown, {}, import("./booking.schema").Booking> & import("./booking.schema").Booking & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
}
