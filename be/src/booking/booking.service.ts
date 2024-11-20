import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './booking.schema';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Session } from 'src/session/session.schema';
import { SessionService } from 'src/session/session.service';
import { Promotion } from 'src/promotion/promotion.schema';
import { Room } from 'src/room/room.schema';
import { PromotionService } from 'src/promotion/promotion.service';
import { NotificationGateway } from 'src/notification/notification/notification.gateway';
import { NotificationService } from 'src/notification/notification.service';
import { BookingStatus } from './enum/bookingStatus.enum';
import { PaymentStatus } from './enum/paymentStatus.enum';
import { GmailService } from 'src/gmail/gmail.service';

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
    private readonly notificationGateway: NotificationGateway,
    private readonly notificationService: NotificationService,
    private readonly gmailService: GmailService,
  ) {}
  async getBookingById(booking_id: string) {
    const findBooking = await this.bookingSchema.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(booking_id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room_id',
          foreignField: '_id',
          as: 'roomDetails',
        },
      },
      {
        $unwind: '$roomDetails',
      },
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
    ]);
    if (!findBooking) {
      throw new NotFoundException(`Booking with ID ${booking_id} not found`);
    }
    return findBooking;
  }
  async cancelBooking(booking_id: string) {
    const booking = await this.getBookingById(booking_id);

    if (booking[0].booking_status === BookingStatus.PENDING) {
      await this.bookingSchema.findByIdAndDelete(
        new Types.ObjectId(booking_id),
      );
    } else if (booking[0].booking_status === BookingStatus.COMPLETED) {
      if (booking[0].payment_status === PaymentStatus.PAID) {
        const subject = 'Booking Cancellation Confirmation';
        const text = `Your booking has been cancelled. Here are the details:
          - Property: ${booking[0].property.name}
          - Room(s): ${Array.isArray(booking[0].roomDetails) ? booking[0].roomDetails?.map((room) => room.name).join(', ') : booking[0].roomDetails.name}
          - Check-in Date: ${booking[0].check_in_date.toDateString()}
          - Check-out Date: ${booking[0].check_out_date.toDateString()}
          - Refund Amount: $${booking[0].total_price}`;
        const cancelUrl = `${process.env.BACK_END_URL}/booking/confirm-cancellation?booking_id=${booking[0]._id}&redirect=${process.env.FRONT_END_URL}`;
        const html = `
          <h1>Booking Cancellation Confirmation</h1>
          <p>We received your request to cancel the booking. Here are the details:</p>
          <ul>
            <li><strong>Property:</strong> ${booking[0].property.name}</li>
            <li><strong>Room(s):</strong> ${Array.isArray(booking[0].roomDetails) ? booking[0].roomDetails?.map((room) => room.name).join(', ') : booking[0].roomDetails.name}</li>
            <li><strong>Check-in Date:</strong> ${booking[0].check_in_date.toDateString()}</li>
            <li><strong>Check-out Date:</strong> ${booking[0].check_out_date.toDateString()}</li>
            <li><strong>Refund Amount:</strong> $${booking[0].total_price}</li>
          </ul>
          <p>Please click the button below to confirm cancellation</p>
          <a href="${cancelUrl}" style="
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: red;
          text-decoration: none;
          border-radius: 5px;
        ">Confirm Cancellation</a>
        <p>If you did not request this action, you can safely ignore this email.</p>
          <p>We hope to serve you again in the future.</p>
        `;

        await this.gmailService.sendEmail(
          booking[0].userDetails.email,
          subject,
          text,
          html,
        );
      }
    }
  }
  async finalizeCancellation(bookingId: string): Promise<boolean> {
    const booking = await this.getBookingById(bookingId);
    const message = `Your property ${booking[0].propertyDetails.name} has been canceled by ${booking[0].userDetails.email}`;
    await this.notificationService.createNotification({
      sender_id: booking[0].userDetails._id,
      receiver_id: booking[0].propertyDetails.owner_id,
      booking_id: booking[0]._id,
      type: 'Booking',
      message
    })
    booking[0].booking_status = BookingStatus.CANCELED;
    await booking[0].save();
    return true;
  }
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
  async createBooking(createBookingDto: any) {
    const customerId = createBookingDto.customerId;
    // const totalNightPrice =
    //   await this.calculateTotalNightPrice(createBookingDto);

    // const newBooking = new this.bookingSchema(createBookingDto);
    // const savedBooking = await newBooking.save();
    const findExistedBooking = await this.bookingSchema
      .findOne({
        user_id: customerId,
      })
      .populate('user_id');
    if (findExistedBooking.booking_status === BookingStatus.PENDING) {
      throw new BadRequestException('');
    }
    const findPartnerId = await this.roomSchema
      .findOne({
        property_id: createBookingDto.property_id,
      })
      .populate('property_id');
    const partnerId = findPartnerId.property_id.owner_id;
    const message = `Your property ${findPartnerId.property_id.name} has been booked by ${findExistedBooking.user_id.email}`;
    await this.notificationService.createNotification({
      sender_id: new Types.ObjectId(customerId),
      receiver_id: partnerId,
      booking_id: new Types.ObjectId(createBookingDto.booking_id),
      type: 'Booking',
      message,
    });
    this.notificationGateway.sendNotificationToPartner(
      createBookingDto.partnerId.toString(),
      message,
    );

    // await this.bookingSchema.findByIdAndUpdate(savedBooking._id, {
    //   total_price: totalNightPrice,
    // });
    // await this.sessionSchema.findOneAndUpdate(
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
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $match: {
          'propertyDetails.owner_id': new Types.ObjectId(owner_id), 
        },
      },
      {
        $lookup: {
          from: 'rooms', 
          localField: 'room_id', 
          foreignField: '_id', 
          as: 'roomDetails', 
        },
      },
      {
        $project: {
          _id: 1,
          check_in_date: 1,
          check_out_date: 1,
          total_price: 1,
          booking_status: 1,
          capacity: 1,
          propertyDetails: 1,
          roomDetails: 1,
          userDetails: 1
        },
      },
    ]);
  }
  async findUnfinishedBooking(userId: string) {
    const findBooking = await this.bookingSchema.aggregate([
      {
        $match: {
          user_id: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room_id',
          foreignField: '_id',
          as: 'roomDetails',
        },
      },
      {
        $unwind: '$roomDetails',
      },
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
    ]);

    return findBooking;
  }
}
