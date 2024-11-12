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
let BookingService = class BookingService {
  constructor(
    bookingSchema,
    sessionSchema,
    sessionService,
    promotionSchema,
    roomSchema,
    promotionService,
  ) {
    this.bookingSchema = bookingSchema;
    this.sessionSchema = sessionSchema;
    this.sessionService = sessionService;
    this.promotionSchema = promotionSchema;
    this.roomSchema = roomSchema;
    this.promotionService = promotionService;
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
    console.log(checkOutDate);
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
    ]),
  ],
  BookingService,
);
//# sourceMappingURL=booking.service.js.map
