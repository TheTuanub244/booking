"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const room_schema_1 = require("./room.schema");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("../review/review.schema");
const booking_service_1 = require("../booking/booking.service");
const property_schema_1 = require("../property/property.schema");
const session_schema_1 = require("../session/session.schema");
let RoomService = class RoomService {
    constructor(roomSchema, propertySchema, reviewSchema, bookingService, sessionSchema) {
        this.roomSchema = roomSchema;
        this.propertySchema = propertySchema;
        this.reviewSchema = reviewSchema;
        this.bookingService = bookingService;
        this.sessionSchema = sessionSchema;
    }
    async createRoom(createRoomDto) {
        const newRoom = new this.roomSchema(createRoomDto);
        return newRoom.save();
    }
    async getRoomWithProperty(property_id) {
        return this.roomSchema
            .find({
            property_id,
        })
            .populate('property_id');
    }
    async findAvailableRoomWithProperty(property_id) {
        const existedRoom = await this.roomSchema.find({
            $and: [{ property_id: property_id }, { 'capacity.room': { $gt: 0 } }],
        });
        return existedRoom;
    }
    async isDuplicateSearch(recentSearch, newSearch) {
        return recentSearch.some((search) => {
            const isSameCheckIn = search.check_in && newSearch.checkIn
                ? search.check_in.getTime() === newSearch.checkIn.getTime()
                : false;
            const isSameCheckOut = search.check_out && newSearch.checkOut
                ? search.check_out.getTime() === newSearch.checkOut.getTime()
                : false;
            return (search.province === newSearch.place &&
                isSameCheckIn &&
                isSameCheckOut &&
                search.capacity.adults === newSearch.capacity.adults &&
                search.capacity.childs.count === newSearch.capacity.childs.count &&
                search.capacity.childs.age === newSearch.capacity.childs.age &&
                search.capacity.room === newSearch.capacity.room);
        });
    }
    async findAvailableRoomWithSearch(userId, place, check_in, check_out, capacity) {
        const findProperties = await this.propertySchema.find({
            'address.province': place,
        });
        const availableRoom = [];
        await Promise.all(findProperties.map(async (property) => {
            const findAvailableRoom = await this.findAvailableRoomWithProperty(property._id);
            await Promise.all(findAvailableRoom.map(async (value) => {
                const finalRespone = await this.findConflictingInBookings(value._id, property._id, check_in, check_out);
                if (finalRespone.length === 0) {
                    availableRoom.push(value);
                }
            }));
        }));
        const session = await this.sessionSchema.findOne({ userId });
        if (!session)
            throw new Error('Session not found');
        const isDuplicate = await this.isDuplicateSearch(session.recent_search, {
            place,
            capacity,
            checkIn: new Date(check_in),
            checkOut: new Date(check_out),
        });
        if (!isDuplicate) {
            await this.sessionSchema.findOneAndUpdate({
                userId,
            }, {
                $push: {
                    recent_search: {
                        $each: [{ province: place, check_in, check_out, capacity }],
                        $slice: -3,
                    },
                },
            }, { new: true });
        }
        return availableRoom;
    }
    async findConflictingInBookings(room_id, property_id, check_in, check_out) {
        const findRoomInBooking = await this.bookingService.findConflictingBookings(property_id, room_id, check_in, check_out);
        return findRoomInBooking;
    }
    async findRoom(findRoomDto) {
        const findRoom = await this.roomSchema.find({
            $and: [
                { 'capacity.adults': { $gte: findRoomDto.capacity.adults } },
                { 'capacity.childs.age': { $gte: findRoomDto.capacity.childs.age } },
                {
                    'capacity.childs.count': { $gte: findRoomDto.capacity.childs.count },
                },
                { 'capacity.room': { $gte: findRoomDto.capacity.room } },
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
                {
                    $or: [{ availability: null }, { availability: {} }],
                },
            ],
        });
        return findRoom;
    }
    async updateImageForRoom(roomId, image) {
        return await this.roomSchema.findByIdAndUpdate(roomId, {
            $push: {
                images: {
                    $each: image,
                },
            },
        }, { new: true });
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __param(1, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __param(2, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(4, (0, mongoose_1.InjectModel)(session_schema_1.Session.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        booking_service_1.BookingService,
        mongoose_2.Model])
], RoomService);
//# sourceMappingURL=room.service.js.map