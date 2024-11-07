import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './room.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateRoomDto } from './dto/createRoom.dto';
import { FindRoomDto } from './dto/findRoom.dto';
import { Review } from 'src/review/review.schema';
import { BookingService } from 'src/booking/booking.service';
import { Property } from 'src/property/property.schema';
import { Session } from 'src/session/session.schema';

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
    ) { }
    async createRoom(createRoomDto: CreateRoomDto) {
        const newRoom = new this.roomSchema(createRoomDto);
        return newRoom.save();
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
}
