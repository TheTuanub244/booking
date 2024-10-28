import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class CreateSessionDto {
    userId: string;
    uid: string;
    data: {
        lastViewProperties: ObjectId[];
        lastBooking: ObjectId;
    };
}
