import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/createReview.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    createReview(createReviewDto: CreateReviewDto): Promise<import("mongoose").Document<unknown, {}, import("../room/room.schema").Room> & import("../room/room.schema").Room & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    findReviewWithProperty(property_id: any): Promise<number>;
    getMonthlyRating(id: any): Promise<{
        [key: number]: number;
    }>;
    getMonthlyRatingByProperty(id: any): Promise<{
        [key: number]: number;
    }>;
}
