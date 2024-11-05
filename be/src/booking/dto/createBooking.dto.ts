import { ObjectId } from "mongoose"

export class CreateBookingDto {
    firstName: string
    lastName: string
    email: string
    country: string
    phoneNumber: string
    room_id: ObjectId[]
    user_id: ObjectId
    property: ObjectId
    request: string
    check_in_date: Date
    check_out_date: Date
}