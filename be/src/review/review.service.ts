import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './review.schema';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/createReview.dto';
import { Property } from 'src/property/property.schema';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name)
        private readonly reviewSchema: Model<Review>,
        @InjectModel(Property.name)
        private readonly propertySchema: Model<Property>,
    ) { }
    async createReview(createReviewDto: CreateReviewDto) {
        const newReview = new this.reviewSchema(createReviewDto);
        const savedReview = await newReview.save();
        const existProperty = await this.propertySchema.findById(
            createReviewDto.property_id,
        );
        if (existProperty.rate === 0) {
            const updateProperty = await this.propertySchema.findByIdAndUpdate(
                createReviewDto.property_id,
                {
                    $set: {
                        rate: savedReview.rating,
                    },
                },
            );
            return updateProperty.save();
        } else {
            const oldRating = existProperty.rate;
            const newRating = (oldRating + savedReview.rating) / 2;
            const roundedRating = Math.round(newRating * 10) / 10;
            const updateProperty = await this.propertySchema.findByIdAndUpdate(
                createReviewDto.property_id,
                {
                    $set: {
                        rate: roundedRating,
                    },
                },
            );
            return updateProperty.save()
        }
    }
    async findReviewWithProperty(property_id: string) {
        return this.reviewSchema
            .countDocuments({ property_id })
            .populate('property_id')
            .exec()
            .then(count => {
                console.log(`Total reviews: ${count}`);
                return count

            })
    }
}
