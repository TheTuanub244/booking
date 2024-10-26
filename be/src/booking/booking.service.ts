import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './booking.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Session } from 'src/session/session.schema';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingSchema: Model<Booking>,
    @InjectModel(Session.name)
    private readonly sessionSchema: Model<Session>,
    private readonly sessionService: SessionService,
  ) { } // TODO: calculate the total price
  async createBooking(createBookingDto: CreateBookingDto) {
    const newBooking = new this.bookingSchema(createBookingDto);
    const savedBooking = await newBooking.save();
    const findSession = await this.sessionSchema.findOneAndUpdate(
      {
        userId: createBookingDto.user_id,
      },
      {
        $set: {
          data: {
            lastBooking: savedBooking._id,
          },
        },
      },
    );
    await findSession.save();
    return savedBooking;
  }
  async findAvailableRoom(
    property: mongoose.Types.ObjectId,
    check_in: Date,
    check_out: Date,
  ) {

    const findRoomForBooking = await this.bookingSchema.find({
      $and: [
        {
          property: property.toString(),
        },
        {
          $or: [
            { check_out_date: { $lt: check_in } },
            { check_in_date: { $gt: check_out } },
          ],
        },
      ],
    });
    return findRoomForBooking;
  }
}
