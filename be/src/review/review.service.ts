import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './review.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateReviewDto } from './dto/createReview.dto';
import { Property } from 'src/property/property.schema';
import { Room } from 'src/room/room.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewSchema: Model<Review>,
    @InjectModel(Property.name)
    private readonly propertySchema: Model<Property>,
    @InjectModel(Room.name)
    private readonly roomSchema: Model<Room>,
  ) {}
  async createReview(createReviewDto: CreateReviewDto) {
    const newReview = new this.reviewSchema(createReviewDto);
    const savedReview = await newReview.save();
    const findRoom = await this.roomSchema
      .findById(createReviewDto.roomId)
      .populate('property_id');
    const findProperty = await this.propertySchema.findById(
      findRoom.property_id,
    );
    if (findProperty.rate === 0) {
      const updateProperty = await this.propertySchema.findByIdAndUpdate(
        findProperty._id,
        {
          $set: {
            rate: savedReview.rating,
          },
        },
      );
      await updateProperty.save();
    } else {
      const oldRating = findProperty.rate;
      const newRating = (oldRating + savedReview.rating) / 2;
      const roundedRating = Math.round(newRating * 10) / 10;
      const updateProperty = await this.propertySchema.findByIdAndUpdate(
        findProperty._id,
        {
          $set: {
            rate: roundedRating,
          },
        },
      );

      await updateProperty.save();
    }

    if (findRoom.rating === 0) {
      const updateRoom = await this.roomSchema.findByIdAndUpdate(findRoom._id, {
        $set: {
          rating: savedReview.rating,
        },
      });

      return updateRoom.save();
    } else {
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
  async findReviewWithProperty(property_id: mongoose.Types.ObjectId) {
    const rooms = await this.roomSchema.find({ property_id });
    const roomIds = rooms.map((room) => room._id);

    // Step 2: Count reviews where room_id is in the list of roomIds
    const reviewCount = await this.reviewSchema
      .countDocuments({ room_id: { $in: roomIds } })
      .exec();

    return reviewCount;
  }
  async getMonthlyRating(owner_id: string) {
    const reviews = await this.reviewSchema
      .find()
      .populate({
        path: 'roomId',
        populate: {
          path: 'property_id',
          match: { owner_id: new mongoose.Types.ObjectId(owner_id) },
        },
      })
      .exec();

    const validReviews = reviews.filter(
      (review) => review.roomId?.property_id !== null,
    );

    const ratingCounts: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    validReviews.forEach((review) => {
      const roundedRating = Math.ceil(review.rating);
      ratingCounts[roundedRating] = (ratingCounts[roundedRating] || 0) + 1;
    });

    return ratingCounts;
  }
  async getMonthlyRatingByProperty(property_id: string) {
    const reviews = await this.reviewSchema
      .find()
      .populate({
        path: 'roomId',
        populate: {
          path: 'property_id',
          match: { _id: new mongoose.Types.ObjectId(property_id) },
        },
      })
      .exec();

    const validReviews = reviews.filter(
      (review) => review.roomId?.property_id !== null,
    );

    const ratingCounts: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    validReviews.forEach((review) => {
      const roundedRating = Math.ceil(review.rating);
      ratingCounts[roundedRating] = (ratingCounts[roundedRating] || 0) + 1;
    });

    return ratingCounts;
  }
}
