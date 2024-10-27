import { ObjectId } from 'mongoose';

export class CreateRoomDto {
    property_id: ObjectId;
    price_per_night: number;
    name: string;
    capactity: {
        adults: number;
        childs: {
            count: number;
            age: number;
        };
    };
    facility: string[];
}
