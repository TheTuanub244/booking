import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './room.schema';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/createRoom.dto';
import { FindRoomDto } from './dto/findRoom.dto';
import { Review } from 'src/review/review.schema';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name)
        private readonly roomSchema: Model<Room>,
        @InjectModel(Review.name)
        private readonly reviewSchema: Model<Review>,
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
    async findRoom(findRoomDto: FindRoomDto) {
        const findRoom = await this.roomSchema.find({

            $and: [
                { 'capacity.adults': { $gte: findRoomDto.capacity.adults } },
                { 'capacity.childs.age': { $gte: findRoomDto.capacity.childs.age } },
                { 'capacity.childs.count': { $gte: findRoomDto.capacity.childs.count } },
                {

                    $or: [
                        { 'availability.check_out_date': { $lt: findRoomDto.check_in_date } },
                        { 'availability.check_in_date': { $gt: findRoomDto.check_out_date } }
                    ]
                }
            ]

        });
        return findRoom
    }
}
