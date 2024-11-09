import { ObjectId } from 'mongoose';

export class CreateRoomDto {
    property_id: ObjectId;
    price_per_night: number;
    name: string;
    size;
    capactity: {
        adults: number;
        childs: {
            count: number;
            age: number;
        };
    };
    type: string;
    images: string[];
}
