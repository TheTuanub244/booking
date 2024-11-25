import { Booking } from './booking.schema';
import mongoose, { Model } from 'mongoose';
import { Session } from 'src/session/session.schema';
import { SessionService } from 'src/session/session.service';
import { Promotion } from 'src/promotion/promotion.schema';
import { Room } from 'src/room/room.schema';
import { PromotionService } from 'src/promotion/promotion.service';
import { NotificationGateway } from 'src/notification/notification/notification.gateway';
import { NotificationService } from 'src/notification/notification.service';
export declare class BookingService {
  private readonly bookingSchema;
  private readonly sessionSchema;
  private readonly sessionService;
  private readonly promotionSchema;
  private readonly roomSchema;
  private readonly promotionService;
  private readonly notificationGateway;
  private readonly notificationService;
  constructor(
    bookingSchema: Model<Booking>,
    sessionSchema: Model<Session>,
    sessionService: SessionService,
    promotionSchema: Model<Promotion>,
    roomSchema: Model<Room>,
    promotionService: PromotionService,
    notificationGateway: NotificationGateway,
    notificationService: NotificationService,
  );
  calculateTotalNightPrice(booking: any): Promise<number>;
  createBooking(createBookingDto: any): Promise<{
    success: boolean;
  }>;
  findConflictingBookings(
    property: mongoose.Types.ObjectId,
    roomId: mongoose.Types.ObjectId,
    check_in: Date,
    check_out: Date,
  ): Promise<string[]>;
  getMonthlyRevenueByOwner(owner_id: string): Promise<any[]>;
  getMonthlyRevenueByProperty(propety_id: string): Promise<any[]>;
  getBooking(owner_id: string): Promise<any[]>;
}
