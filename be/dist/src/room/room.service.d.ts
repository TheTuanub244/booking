import { Room } from './room.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateRoomDto } from './dto/createRoom.dto';
import { FindRoomDto } from './dto/findRoom.dto';
import { Review } from 'src/review/review.schema';
import { BookingService } from 'src/booking/booking.service';
import { Property } from 'src/property/property.schema';
import { Session } from 'src/session/session.schema';
export declare class RoomService {
    private readonly roomSchema;
    private readonly propertySchema;
    private readonly reviewSchema;
    private readonly bookingService;
    private readonly sessionSchema;
    constructor(roomSchema: Model<Room>, propertySchema: Model<Property>, reviewSchema: Model<Review>, bookingService: BookingService, sessionSchema: Model<Session>);
    createRoom(createRoomDto: CreateRoomDto): Promise<mongoose.Document<unknown, {}, Room> & Room & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v?: number;
    }>;
    getRoomWithProperty(property_id: ObjectId): Promise<(mongoose.Document<unknown, {}, Room> & Room & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    findAvailableRoomWithProperty(property_id: mongoose.Types.ObjectId): Promise<(mongoose.Document<unknown, {}, Room> & Room & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    isDuplicateSearch(recentSearch: any[], newSearch: any): Promise<boolean>;
    findAvailableRoomWithSearch(userId: any, place: any, check_in: any, check_out: any, capacity: any): Promise<any[]>;
    findConflictingInBookings(room_id: mongoose.Types.ObjectId, property_id: mongoose.Types.ObjectId, check_in: Date, check_out: Date): Promise<string[]>;
    findRoom(findRoomDto: FindRoomDto): Promise<(mongoose.Document<unknown, {}, Room> & Room & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    updateImageForRoom(roomId: any, image: any): Promise<mongoose.Document<unknown, {}, Room> & Room & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v?: number;
    }>;
}
