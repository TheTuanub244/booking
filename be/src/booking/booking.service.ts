import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './booking.schema';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Session } from 'src/session/session.schema';
import { SessionService } from 'src/session/session.service';
import { Promotion } from 'src/promotion/promotion.schema';
import { Room } from 'src/room/room.schema';
import { PromotionService } from 'src/promotion/promotion.service';

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
    private readonly roomSchema: Model<Room>,
    private readonly promotionService: PromotionService,
  ) {} // TODO: calculate the total price

  async calculateTotalNightPrice(booking: any) {
    const findRoomPromotion =
      await this.promotionService.findRoomPromotionForBooking(booking.room_id);
    const findPropertyPromotion =
      await this.promotionService.findPropertyPromotionForBooking(
        booking.property,
      );

    let totalNightPrice = 0;

    const checkInDate = new Date(booking.check_in_date);
    const checkOutDate = new Date(booking.check_out_date);

    await Promise.all(
      booking.room_id.map(async (roomId) => {
        const findRoom = await this.roomSchema.findById(roomId);

        const pricePerNightWeekday = findRoom.price_per_night.weekday;
        const pricePerNightWeekend = findRoom.price_per_night.weekend;

        const currentDate = new Date(checkInDate);

        while (currentDate < checkOutDate) {
          const dayOfWeek = currentDate.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          if (
            findRoomPromotion &&
            currentDate >= new Date(findRoomPromotion.startDate) &&
            currentDate <= new Date(findRoomPromotion.endDate)
          ) {
            if (isWeekend) {
              totalNightPrice +=
                pricePerNightWeekend *
                (1 - findRoomPromotion.discountPercentage / 100);
            } else {
              totalNightPrice +=
                pricePerNightWeekday *
                (1 - findRoomPromotion.discountPercentage / 100);
            }
          } else if (
            findPropertyPromotion &&
            currentDate >= new Date(findPropertyPromotion.startDate) &&
            currentDate <= new Date(findPropertyPromotion.endDate)
          ) {
            if (isWeekend) {
              totalNightPrice +=
                pricePerNightWeekend *
                (1 - findPropertyPromotion.discountPercentage / 100);
            } else {
              totalNightPrice +=
                pricePerNightWeekday *
                (1 - findPropertyPromotion.discountPercentage / 100);
            }
          } else {
            totalNightPrice += isWeekend
              ? pricePerNightWeekend
              : pricePerNightWeekday;
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }
      }),
    );

    return totalNightPrice;
  }
  async createBooking(createBookingDto: CreateBookingDto) {
    const totalNightPrice =
      await this.calculateTotalNightPrice(createBookingDto);

    const newBooking = new this.bookingSchema(createBookingDto);
    const savedBooking = await newBooking.save();

    await this.bookingSchema.findByIdAndUpdate(savedBooking._id, {
      total_price: totalNightPrice,
    });
    await this.sessionSchema.findOneAndUpdate(
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
    return savedBooking;
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

  async getMonthlyRevenueByOwner(owner_id: string): Promise<any[]> {
    const objectIdOwnerId = new Types.ObjectId(owner_id);

    const result = await this.bookingSchema.aggregate([
      {
        $match: {
          booking_status: 'completed',
        },
      },
      {
        $lookup: {
          from: 'properties',
          localField: 'property',
          foreignField: '_id',
          as: 'propertyDetails',
        },
      },
      { $unwind: '$propertyDetails' },
      {
        $match: {
          'propertyDetails.owner_id': objectIdOwnerId,
        },
      },
      {
        $project: {
          owner_id: '$propertyDetails.owner_id',
          check_in_date: 1,
          check_out_date: 1,
          total_price: 1,
          duration: {
            $divide: [
              { $subtract: ['$check_out_date', '$check_in_date'] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
      {
        $addFields: {
          dailyRevenue: { $divide: ['$total_price', '$duration'] },
        },
      },
      {
        $project: {
          owner_id: 1,
          days: { $range: [0, { $toInt: '$duration' }] },
          check_in_date: 1,
          dailyRevenue: 1,
        },
      },
      { $unwind: '$days' },
      {
        $group: {
          _id: {
            owner_id: '$owner_id',
            year: {
              $year: {
                $add: [
                  '$check_in_date',
                  { $multiply: ['$days', 1000 * 60 * 60 * 24] },
                ],
              },
            },
            month: {
              $month: {
                $add: [
                  '$check_in_date',
                  { $multiply: ['$days', 1000 * 60 * 60 * 24] },
                ],
              },
            },
          },
          monthlyRevenue: { $sum: '$dailyRevenue' },
        },
      },
      {
        $group: {
          _id: { owner_id: '$_id.owner_id', year: '$_id.year' },
          monthlyRevenues: {
            $push: {
              month: '$_id.month',
              revenue: '$monthlyRevenue',
            },
          },
          yearlyRevenue: { $sum: '$monthlyRevenue' },
        },
      },
      { $sort: { '_id.year': 1 } },
    ]);

    return result.map((item) => ({
      owner_id: item._id.owner_id,
      year: item._id.year,
      monthlyRevenues: item.monthlyRevenues,
      yearlyRevenue: item.yearlyRevenue,
    }));
  }
  async getMonthlyRevenueByProperty(propety_id: string): Promise<any[]> {
    const objectIdPropertyId = new Types.ObjectId(propety_id);
    console.log(objectIdPropertyId);

    const result = await this.bookingSchema.aggregate([
      {
        $match: {
          booking_status: 'completed',
        },
      },
      {
        $lookup: {
          from: 'properties',
          localField: 'property',
          foreignField: '_id',
          as: 'propertyDetails',
        },
      },
      { $unwind: '$propertyDetails' },
      {
        $match: {
          'propertyDetails._id': objectIdPropertyId, // Thay đổi ở đây
        },
      },
      {
        $project: {
          property_id: '$propertyDetails._id', // Thay đổi ở đây
          check_in_date: 1,
          check_out_date: 1,
          total_price: 1,
          duration: {
            $divide: [
              { $subtract: ['$check_out_date', '$check_in_date'] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
      {
        $addFields: {
          dailyRevenue: { $divide: ['$total_price', '$duration'] },
        },
      },
      {
        $project: {
          property_id: 1, // Thay đổi ở đây
          days: { $range: [0, { $toInt: '$duration' }] },
          check_in_date: 1,
          dailyRevenue: 1,
        },
      },
      { $unwind: '$days' },
      {
        $group: {
          _id: {
            property_id: '$property_id', // Thay đổi ở đây
            year: {
              $year: {
                $add: [
                  '$check_in_date',
                  { $multiply: ['$days', 1000 * 60 * 60 * 24] },
                ],
              },
            },
            month: {
              $month: {
                $add: [
                  '$check_in_date',
                  { $multiply: ['$days', 1000 * 60 * 60 * 24] },
                ],
              },
            },
          },
          monthlyRevenue: { $sum: '$dailyRevenue' },
        },
      },
      {
        $group: {
          _id: { property_id: '$_id.property_id', year: '$_id.year' }, // Thay đổi ở đây
          monthlyRevenues: {
            $push: {
              month: '$_id.month',
              revenue: '$monthlyRevenue',
            },
          },
          yearlyRevenue: { $sum: '$monthlyRevenue' },
        },
      },
      { $sort: { '_id.year': 1 } },
    ]);

    return result.map((item) => ({
      owner_id: item._id.owner_id,
      year: item._id.year,
      monthlyRevenues: item.monthlyRevenues,
      yearlyRevenue: item.yearlyRevenue,
    }));
  }
  async getBooking(owner_id: string) {
    console.log(owner_id);
    
    return this.bookingSchema.aggregate([
      {
        $lookup: {
          from: 'properties',
          localField: 'property',
          foreignField: '_id',
          as: 'propertyDetails',
        },
      },
      {
        $unwind: '$propertyDetails',
      },
      {
        $match: {
          'propertyDetails.owner_id': new Types.ObjectId(owner_id),
        },
      },
    ]);
  }

}
