import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
import { TYPE } from './enum/type.enum';
import { Room } from 'src/room/room.schema';
import { Amentites } from 'src/amentites/amentities.schema';

@Schema()
export class Property {
    @Prop({ require: true, type: mongoose.Schema.ObjectId, ref: 'User' })
    owner_id: User;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    description: string;
    @Prop({
        type: {
            province: {
                type: String,
                require: true,
            },
            district: {
                type: String,
                require: true,
            },
            ward: {
                type: String,
                require: true,
            },
            street: {
                type: String,
                require: true,
            },
        },
        _id: false,
    })
    address: {
        province: string;
        district: string;
        ward: string;
        street: string;
    };
    @Prop({
        type: {
            longtitude: {
                type: Number,
                require: true,
            },
            latitude: {
                type: Number,
                require: true,
            },
        },
        _id: false,
    })
    location: {
        longtitude: number;
        latitude: number;
    };
    @Prop({ type: String, enum: TYPE })
    property_type: TYPE;

    @Prop({ required: true })
    rate: number;
    @Prop([
        {
            dealName: String,
            discount: Number,
            startDate: Date,
            endDate: Date,
            isActive: { type: Boolean, default: true },
        },
    ])
    promotions: [
        {
            dealName: string;
            discount: number;
            startDate: Date;
            endDate: Date;
            isActive: boolean;
        },
    ];
}
export const PropertySchema = SchemaFactory.createForClass(Property);
