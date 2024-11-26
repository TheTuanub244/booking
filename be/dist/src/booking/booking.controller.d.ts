import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(createBookingDto: any): Promise<void>;
    getMonthlyRevenue(id: string): Promise<any[]>;
    getMonthlyRevenueByProperty(id: string): Promise<any[]>;
    getBookingByOwner(id: string): Promise<any[]>;
    cancelBooking(id: string): Promise<void>;
    confirmCancellation(booking_id: string, redirect: string, res: any): Promise<any>;
    findUnfinishedBooking(userId: string): Promise<any[]>;
}
