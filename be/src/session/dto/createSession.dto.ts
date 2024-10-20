import { Type } from 'class-transformer';

export class CreateSessionDto {
    userId: string;
    data: {
        lastViewProperties: string;
        lastBooking: string;
    };
}
