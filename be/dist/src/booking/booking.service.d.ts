import { Booking } from './booking.schema';
import mongoose, { Model } from 'mongoose';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Session } from 'src/session/session.schema';
import { SessionService } from 'src/session/session.service';
import { Promotion } from 'src/promotion/promotion.schema';
import { Room } from 'src/room/room.schema';
import { PromotionService } from 'src/promotion/promotion.service';
export declare class BookingService {
  private readonly bookingSchema;
  private readonly sessionSchema;
  private readonly sessionService;
  private readonly promotionSchema;
  private readonly roomSchema;
  private readonly promotionService;
  constructor(
    bookingSchema: Model<Booking>,
    sessionSchema: Model<Session>,
    sessionService: SessionService,
    promotionSchema: Model<Promotion>,
    roomSchema: Model<Room>,
    promotionService: PromotionService,
  );
  calculateTotalNightPrice(booking: any): Promise<number>;
  createBooking(createBookingDto: CreateBookingDto): Promise<
    mongoose.Document<unknown, {}, Booking> &
      Booking & {
        _id: mongoose.Types.ObjectId;
      } & {
        __v?: number;
      }
  >;
  findConflictingBookings(
    property: mongoose.Types.ObjectId,
    roomId: mongoose.Types.ObjectId,
    check_in: Date,
    check_out: Date,
  ): Promise<string[]>;
}
