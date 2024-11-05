import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './booking.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Session } from 'src/session/session.schema';
import { SessionService } from 'src/session/session.service';
import { Promotion } from 'src/promotion/promotion.schema';
import { Room } from 'src/room/room.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingSchema: Model<Booking>,
    @InjectModel(Session.name)
    private readonly sessionSchema: Model<Session>,
    private readonly sessionService: SessionService,
    @InjectModel(Promotion.name)
    private readonly promotionSchema: Model<Promotion>,
    @InjectModel(Room.name)
    private readonly roomSchema: Model<Room>
  ) { } // TODO: calculate the total price
  async countWeekdaysAndWeekends(checkInDate, checkOutDate) {
    let weekendCount = 0;
    let weekdayCount = 0;
    const currentDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendCount++;
      } else {
        weekdayCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1); // Chuyển sang ngày tiếp theo
    }

    return { weekdayCount, weekendCount };
  }

  async calculateTotalNightPrice(booking: any) {
    const findPromotion = await this.promotionSchema.find({ propertyId: { $in: [booking.property] } })
    const result = await this.countWeekdaysAndWeekends(booking.check_in_date, booking.check_out_date)
    let totalNightPrice = 0;
    await Promise.all(
      booking.room_id.map(async (value) => {
        const findRoom = await this.roomSchema.findById(value)
        totalNightPrice += findRoom.price_per_night.weekday * result.weekdayCount + findRoom.price_per_night.weekend * result.weekendCount
      })
    )
    console.log(totalNightPrice);

  }
  async createBooking(createBookingDto: CreateBookingDto) {
    this.calculateTotalNightPrice(createBookingDto)
    // const newBooking = new this.bookingSchema(createBookingDto);
    // const savedBooking = await newBooking.save();
    // const findSession = await this.sessionSchema.findOneAndUpdate(
    //   {
    //     userId: createBookingDto.user_id,
    //   },
    //   {
    //     $set: {
    //       data: {
    //         lastBooking: savedBooking._id,
    //       },
    //     },
    //   },
    // );
    // await findSession.save();
    // return savedBooking;
  }
  async findConflictingBookings(
    property: mongoose.Types.ObjectId,
    roomId: mongoose.Types.ObjectId,
    check_in: Date,
    check_out: Date,
  ) {
    const conflictingBookings = await this.bookingSchema.find({
      $and: [
        {
          property: property.toString(),
        },
        { room_id: roomId.toString() },
        {
          $or: [
            {
              check_in_date: { $lte: check_out },
              check_out_date: { $gte: check_in },
            },
          ],
        },
      ],
    });

    const conflictingRoomIds = conflictingBookings.map((booking) =>
      booking.room_id.toString(),
    );

    return conflictingRoomIds;
  }
}
