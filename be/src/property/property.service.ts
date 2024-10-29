import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './property.schema';

import { Model, ObjectId } from 'mongoose';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { BookingService } from 'src/booking/booking.service';
import { RoomService } from 'src/room/room.service';
import { Review } from 'src/review/review.schema';
import { ReviewService } from 'src/review/review.service';

@Injectable()
export class PropertyService {
    constructor(
        @InjectModel(Property.name)
        private readonly propertySchema: Model<Property>,
        private readonly bookingService: BookingService,
        private readonly roomService: RoomService,
        @InjectModel(Review.name)
        private readonly reviewSchema: Model<Review>,
        private readonly reviewService: ReviewService
    ) { }
    async createNewProperty(createPropertyDto: CreatePropertyDto) {
        const newProperty = new this.propertySchema(createPropertyDto);
        return newProperty.save();
    }
    async getAllProperty() {
        return this.propertySchema.find();
    }
    async getPropertyWithOwner(owner_id: string) {
        return this.propertySchema
            .findOne({
                owner_id: owner_id,
            })
            .populate('owner_id')
            .exec();
    }
    async getPropertyById(id: ObjectId) {
        return this.propertySchema.findById(id);
    }
    async getPropertiesSortedByRate() {
        const properties = await this.propertySchema.find().sort({ rate: -1 }).limit(4);
        const propertiesWithRate = []
        await Promise.all(
            properties.map(async (property) => {
                const review = await this.reviewService.findReviewWithProperty(property._id)
                propertiesWithRate.push({
                    property,
                    numberReviews: review
                })

            })
        )

        return propertiesWithRate
    }
    async getPropertyTypesByPlace(province: string) {
        return this.propertySchema.distinct('property_type', {
            'address.province': province
        })
    }
    async getPropertyByTypeAndPlace(place: string, type: string) {
        return this.propertySchema.find({
            'address.province': place,
            property_type: type
        })
    }
    async getAllTypeOfProperties() {
        return this.propertySchema.distinct('property_type')

    }
}
