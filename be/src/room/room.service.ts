import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './room.schema';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { CreateRoomDto } from './dto/createRoom.dto';
import { FindRoomDto } from './dto/findRoom.dto';
import { Review } from 'src/review/review.schema';
import { BookingService } from 'src/booking/booking.service';
import { Property } from 'src/property/property.schema';
import { Session } from 'src/session/session.schema';
import { Booking } from 'src/booking/booking.schema';
import moment from 'moment';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomSchema: Model<Room>,
    @InjectModel(Property.name)
    private readonly propertySchema: Model<Property>,
    @InjectModel(Review.name)
    private readonly reviewSchema: Model<Review>,
    private readonly bookingService: BookingService,
    @InjectModel(Session.name)
    private readonly sessionSchema: Model<Session>,
    @InjectModel(Booking.name)
    private readonly bookingSchema: Model<Booking>,
  ) {}
  async createRoom(createRoomDto: CreateRoomDto) {
    const newRoom = new this.roomSchema(createRoomDto);
    return newRoom.save();
  }
  async countRoomWithPropety(property_id: mongoose.Types.ObjectId) {
    return await this.roomSchema.countDocuments({ property_id });
  }
  async getRoomWithProperty(property_id: ObjectId) {
    return this.roomSchema
      .find({
        property_id,
      })
      .populate('property_id');
  }
  async findAvailableRoomWithProperty(property_id: mongoose.Types.ObjectId) {
    const existedRoom = await this.roomSchema.find({
      $and: [{ property_id: property_id }, { 'capacity.room': { $gt: 0 } }],
    });

    return existedRoom;
  }
  async isDuplicateSearch(
    recentSearch: any[],
    newSearch: any,
  ): Promise<boolean> {
    return recentSearch.some((search) => {
      // Check if date fields are defined before calling .getTime()
      const isSameCheckIn =
        search.check_in && newSearch.checkIn
          ? search.check_in.getTime() === newSearch.checkIn.getTime()
          : false;

      const isSameCheckOut =
        search.check_out && newSearch.checkOut
          ? search.check_out.getTime() === newSearch.checkOut.getTime()
          : false;

      return (
        search.province === newSearch.place &&
        isSameCheckIn &&
        isSameCheckOut &&
        search.capacity.adults === newSearch.capacity.adults &&
        search.capacity.childs.count === newSearch.capacity.childs.count &&
        search.capacity.childs.age === newSearch.capacity.childs.age &&
        search.capacity.room === newSearch.capacity.room
      );
    });
  }
  async findAvailableRoomWithSearch(
    userId,
    place,
    check_in,
    check_out,
    capacity,
  ) {
    const findProperties = await this.propertySchema.find({
      'address.province': place,
    });

    const availableRoom = [];
    await Promise.all(
      findProperties.map(async (property) => {
        const findAvailableRoom = await this.findAvailableRoomWithProperty(
          property._id,
        );

        await Promise.all(
          findAvailableRoom.map(async (value) => {
            const finalRespone = await this.findConflictingInBookings(
              value._id,
              property._id,
              check_in,
              check_out,
            );

            if (finalRespone.length === 0) {
              availableRoom.push(value);
            }
          }),
        );
      }),
    );
    const session = await this.sessionSchema.findOne({ userId });
    if (!session) throw new Error('Session not found');

    // Use the custom comparison function
    const isDuplicate = await this.isDuplicateSearch(session.recent_search, {
      place,
      capacity,
      checkIn: new Date(check_in),
      checkOut: new Date(check_out),
    });

    if (!isDuplicate) {
      await this.sessionSchema.findOneAndUpdate(
        {
          userId,
        },
        {
          $push: {
            recent_search: {
              $each: [{ province: place, check_in, check_out, capacity }],
              $slice: -3,
            },
          },
        },
        { new: true },
      );
    }

    return availableRoom;
  }
  async findConflictingInBookings(
    room_id: mongoose.Types.ObjectId,
    property_id: mongoose.Types.ObjectId,
    check_in: Date,
    check_out: Date,
  ) {
    const findRoomInBooking = await this.bookingService.findConflictingBookings(
      property_id,
      room_id,
      check_in,
      check_out,
    );

    return findRoomInBooking;
  }
  async findRoom(findRoomDto: FindRoomDto) {
    // const findExistBooking = await this.book
    const findRoom = await this.roomSchema.find({
      $and: [
        // Check if room meets capacity requirements for adults, children, and rooms
        { 'capacity.adults': { $gte: findRoomDto.capacity.adults } },
        { 'capacity.childs.age': { $gte: findRoomDto.capacity.childs.age } },
        {
          'capacity.childs.count': { $gte: findRoomDto.capacity.childs.count },
        },
        { 'capacity.room': { $gte: findRoomDto.capacity.room } },

        // Check if room availability does not overlap with requested dates
        {
          $or: [
            {
              'availability.check_out_date': { $lt: findRoomDto.check_in_date },
            },
            {
              'availability.check_in_date': { $gt: findRoomDto.check_out_date },
            },
          ],
        },

        // Check for availability being either null or an empty object
        {
          $or: [{ availability: null }, { availability: {} }],
        },
      ],
    });

    return findRoom;
  }
  async updateImageForRoom(roomId, image) {
    return await this.roomSchema.findByIdAndUpdate(
      roomId,
      {
        $push: {
          images: {
            $each: image,
          },
        },
      },
      { new: true },
    );
  }
  async getMonthlyOccupancyRatesByOwner(
    ownerId: Types.ObjectId,
    year: number,
  ): Promise<{ month: number; occupancyRate: number }[]> {
    const occupancyRates = [];
    ownerId = new Types.ObjectId(ownerId);

    console.log(
      'Gọi hàm getMonthlyOccupancyRatesByOwner với owner_id:',
      ownerId,
    );

    for (let month = 1; month <= 12; month++) {
      const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
      const monthStartDate = new Date(year, month - 1, 1);
      const monthEndDate = new Date(year, month - 1, daysInMonth);

      const result = await this.bookingSchema.aggregate([
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
            booking_status: 'completed',
            'propertyDetails.owner_id': ownerId,
            check_in_date: { $lte: monthEndDate },
            check_out_date: { $gte: monthStartDate },
          },
        },
        {
          $project: {
            room_id: 1,
            property_id: '$propertyDetails._id',
            startDate: {
              $cond: {
                if: { $lt: ['$check_in_date', monthStartDate] },
                then: monthStartDate,
                else: '$check_in_date',
              },
            },
            endDate: {
              $cond: {
                if: { $gt: ['$check_out_date', monthEndDate] },
                then: monthEndDate,
                else: '$check_out_date',
              },
            },
          },
        },
        {
          $project: {
            property_id: 1,
            nightsBooked: {
              $dateDiff: {
                startDate: '$startDate',
                endDate: '$endDate',
                unit: 'day',
              },
            },
          },
        },
        {
          $group: {
            _id: '$property_id',
            totalNightsBooked: { $sum: '$nightsBooked' },
          },
        },
      ]);

      console.log(`Tháng ${month}: Kết quả truy vấn`, result);

      const totalRooms = await this.roomSchema
        .find({
          property_id: { $in: result.map((r) => r._id) },
        })
        .exec();

      const totalAvailableNights = totalRooms.reduce(
        (sum, room) => sum + room.capacity.room * daysInMonth,
        0,
      );

      const totalNightsBooked = result.reduce(
        (sum, r) => sum + r.totalNightsBooked,
        0,
      );

      console.log(
        `Tháng ${month} - Total Nights Booked: ${totalNightsBooked}, Total Available Nights: ${totalAvailableNights}`,
      );

      const occupancyRate = totalAvailableNights
        ? (totalNightsBooked / totalAvailableNights) * 100
        : 0;

      occupancyRates.push({
        month,
        occupancyRate: Number(occupancyRate.toFixed(4)), // Tăng độ chính xác
      });
    }

    console.log('Tổng kết tỷ lệ lấp đầy:', occupancyRates);
    return occupancyRates;
  }
}
