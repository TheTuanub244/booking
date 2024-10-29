import { ObjectId } from "mongoose"

export class CreateReviewDto {
    user_id: ObjectId
    room_id: ObjectId
    rating: number
    review_text: string
    review_type: string
}