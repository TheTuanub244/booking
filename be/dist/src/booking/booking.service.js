'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingService = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const booking_schema_1 = require('./booking.schema');
const mongoose_2 = require('mongoose');
const session_schema_1 = require('../session/session.schema');
const session_service_1 = require('../session/session.service');
const promotion_schema_1 = require('../promotion/promotion.schema');
const room_schema_1 = require('../room/room.schema');
const promotion_service_1 = require('../promotion/promotion.service');
const notification_gateway_1 = require('../notification/notification/notification.gateway');
const notification_service_1 = require('../notification/notification.service');
let BookingService = class BookingService {
  constructor(
    bookingSchema,
    sessionSchema,
    sessionService,
    promotionSchema,
    roomSchema,
    promotionService,
    notificationGateway,
    notificationService,
  ) {
    this.bookingSchema = bookingSchema;
    this.sessionSchema = sessionSchema;
    this.sessionService = sessionService;
    this.promotionSchema = promotionSchema;
    this.roomSchema = roomSchema;
    this.promotionService = promotionService;
    this.notificationGateway = notificationGateway;
    this.notificationService = notificationService;
  }
  async calculateTotalNightPrice(booking) {
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
  async createBooking(createBookingDto) {
    const customerId = createBookingDto.customerId;
    const findPartnerId = await this.roomSchema
      .findOne({
        property_id: createBookingDto.property_id,
      })
      .populate('property_id');
    const partnerId = findPartnerId.property_id.owner_id;
    const message = `User ${customerId} has booked`;
    await this.notificationService.createNotification({
      sender_id: new mongoose_2.Types.ObjectId(customerId),
      receiver_id: partnerId,
      booking_id: new mongoose_2.Types.ObjectId(createBookingDto.booking_id),
      type: 'Booking',
      message,
    });
    this.notificationGateway.sendNotificationToPartner(
      createBookingDto.partnerId.toString(),
      message,
    );
    return { success: true };
  }
  async findConflictingBookings(property, roomId, check_in, check_out) {
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
  async getMonthlyRevenueByOwner(owner_id) {
    const objectIdOwnerId = new mongoose_2.Types.ObjectId(owner_id);
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
  async getMonthlyRevenueByProperty(propety_id) {
    const objectIdPropertyId = new mongoose_2.Types.ObjectId(propety_id);
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
          'propertyDetails._id': objectIdPropertyId,
        },
      },
      {
        $project: {
          property_id: '$propertyDetails._id',
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
          property_id: 1,
          days: { $range: [0, { $toInt: '$duration' }] },
          check_in_date: 1,
          dailyRevenue: 1,
        },
      },
      { $unwind: '$days' },
      {
        $group: {
          _id: {
            property_id: '$property_id',
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
          _id: { property_id: '$_id.property_id', year: '$_id.year' },
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
  async getBooking(owner_id) {
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
          'propertyDetails.owner_id': new mongoose_2.Types.ObjectId(owner_id),
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
          'propertyDetails.name': 1,
          'propertyDetails.location': 1,
          roomDetails: 1,
          'userDetails.userName': 1,
          'userDetails.email': 1,
        },
      },
    ]);
  }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(1, (0, mongoose_1.InjectModel)(session_schema_1.Session.name)),
    __param(3, (0, mongoose_1.InjectModel)(promotion_schema_1.Promotion.name)),
    __param(4, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __metadata('design:paramtypes', [
      mongoose_2.Model,
      mongoose_2.Model,
      session_service_1.SessionService,
      mongoose_2.Model,
      mongoose_2.Model,
      promotion_service_1.PromotionService,
      notification_gateway_1.NotificationGateway,
      notification_service_1.NotificationService,
    ]),
  ],
  BookingService,
);
//# sourceMappingURL=booking.service.js.map
