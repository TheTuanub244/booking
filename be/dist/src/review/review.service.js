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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const review_schema_1 = require("./review.schema");
const mongoose_2 = require("mongoose");
const property_schema_1 = require("../property/property.schema");
const room_schema_1 = require("../room/room.schema");
let ReviewService = class ReviewService {
    constructor(reviewSchema, propertySchema, roomSchema) {
        this.reviewSchema = reviewSchema;
        this.propertySchema = propertySchema;
        this.roomSchema = roomSchema;
    }
    async createReview(createReviewDto) {
        const newReview = new this.reviewSchema(createReviewDto);
        const savedReview = await newReview.save();
        const findRoom = await this.roomSchema
            .findById(createReviewDto.roomId)
            .populate('property_id');
        const findProperty = await this.propertySchema.findById(findRoom.property_id);
        if (findProperty.rate === 0) {
            const updateProperty = await this.propertySchema.findByIdAndUpdate(findProperty._id, {
                $set: {
                    rate: savedReview.rating,
                },
            });
            await updateProperty.save();
        }
        else {
            const oldRating = findProperty.rate;
            const newRating = (oldRating + savedReview.rating) / 2;
            const roundedRating = Math.round(newRating * 10) / 10;
            const updateProperty = await this.propertySchema.findByIdAndUpdate(findProperty._id, {
                $set: {
                    rate: roundedRating,
                },
            });
            await updateProperty.save();
        }
        if (findRoom.rating === 0) {
            const updateRoom = await this.roomSchema.findByIdAndUpdate(findRoom._id, {
                $set: {
                    rating: savedReview.rating,
                },
            });
            return updateRoom.save();
        }
        else {
            const oldRating = findProperty.rate;
            const newRating = (oldRating + savedReview.rating) / 2;
            const roundedRating = Math.round(newRating * 10) / 10;
            const updateRoom = await this.roomSchema.findByIdAndUpdate(findRoom._id, {
                $set: {
                    rating: roundedRating,
                },
            });
            return updateRoom.save();
        }
    }
    async findReviewWithProperty(property_id) {
        const rooms = await this.roomSchema.find({ property_id });
        const roomIds = rooms.map((room) => room._id);
        const reviewCount = await this.reviewSchema
            .countDocuments({ room_id: { $in: roomIds } })
            .exec();
        return reviewCount;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(1, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __param(2, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ReviewService);
//# sourceMappingURL=review.service.js.map