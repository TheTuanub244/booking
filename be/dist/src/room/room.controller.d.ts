import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/createRoom.dto';
import { FindRoomDto } from './dto/findRoom.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    createRoom(createRoomDto: CreateRoomDto): Promise<import("mongoose").Document<unknown, {}, import("./room.schema").Room> & import("./room.schema").Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    getRoomWithProperty(property_id: any): Promise<(import("mongoose").Document<unknown, {}, import("./room.schema").Room> & import("./room.schema").Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    findRoom(findRoomDto: FindRoomDto): Promise<(import("mongoose").Document<unknown, {}, import("./room.schema").Room> & import("./room.schema").Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    findAvailableRoomWithSearch(data: any): Promise<any[]>;
    updateImageForRoom(data: any): Promise<import("mongoose").Document<unknown, {}, import("./room.schema").Room> & import("./room.schema").Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
}
