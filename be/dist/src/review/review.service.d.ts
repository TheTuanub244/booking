import { Review } from './review.schema';
import mongoose, { Model } from 'mongoose';
import { CreateReviewDto } from './dto/createReview.dto';
import { Property } from 'src/property/property.schema';
import { Room } from 'src/room/room.schema';
export declare class ReviewService {
  private readonly reviewSchema;
  private readonly propertySchema;
  private readonly roomSchema;
  constructor(
    reviewSchema: Model<Review>,
    propertySchema: Model<Property>,
    roomSchema: Model<Room>,
  );
  createReview(createReviewDto: CreateReviewDto): Promise<
    mongoose.Document<unknown, {}, Room> &
      Room & {
        _id: mongoose.Types.ObjectId;
      } & {
        __v?: number;
      }
  >;
  findReviewWithProperty(property_id: mongoose.Types.ObjectId): Promise<number>;
}
