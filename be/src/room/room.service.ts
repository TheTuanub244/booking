import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './room.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateRoomDto } from './dto/createRoom.dto';
import { FindRoomDto } from './dto/findRoom.dto';
import { Review } from 'src/review/review.schema';
import { BookingService } from 'src/booking/booking.service';
import { Property } from 'src/property/property.schema';

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
    ) { }
    async createRoom(createRoomDto: CreateRoomDto) {
        const newRoom = new this.roomSchema(createRoomDto);
        return newRoom.save();
    }
    async getRoomWithProperty(property_id: string) {
        return this.roomSchema
            .findOne({
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
    async findAvailableRoomWithSearch(place, check_in, check_out, capacity) {
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
                    findAvailableRoom.map(async (index) => {
                        const finalRespone = await this.findAvailableRoomForBooking(
                            index._id,
                            property._id,
                            check_in,
                            check_out,
                            capacity,
                        );

                        if (finalRespone.length !== 0) {
                            finalRespone.forEach((room) => {
                                availableRoom.push(room);
                            });
                        }
                    }),
                );
            }),
        );
        return availableRoom;
    }
    async findAvailableRoomForBooking(
        room_id: mongoose.Types.ObjectId,
        property_id: mongoose.Types.ObjectId,
        check_in: Date,
        check_out: Date,
        capacity: any,
    ) {
        const findRoomInBooking = await this.bookingService.findAvailableRoom(
            property_id,
            check_in,
            check_out,
        );

        if (findRoomInBooking.length == 0) {
        }
        const findRoom = await this.roomSchema
            .find({
                $and: [
                    { property_id: property_id },
                    { _id: room_id },
                    {
                        'capacity.adults': { $gte: capacity.adults },
                    },
                    { 'capacity.childs.age': { $gte: capacity.childs.age } },
                    {
                        'capacity.childs.count': { $gte: capacity.childs.count },
                    },
                ],
            })
            .populate('property_id');
        return findRoom;
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
}
