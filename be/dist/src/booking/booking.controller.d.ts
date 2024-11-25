import { BookingService } from './booking.service';
export declare class BookingController {
  private readonly bookingService;
  constructor(bookingService: BookingService);
  createBooking(createBookingDto: any): Promise<{
    success: boolean;
  }>;
  getMonthlyRevenue(id: string): Promise<any[]>;
  getMonthlyRevenueByProperty(id: string): Promise<any[]>;
  getBooking(id: string, status: string): Promise<any[]>;
}
