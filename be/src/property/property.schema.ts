import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
import { TYPE } from './enum/type.enum';

@Schema()
export class Property {
    @Property({ require: true, type: mongoose.Schema.ObjectId, ref: 'User' })
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
        },
        _id: false,
    })
    address: {
        province: string;
        district: string;
        ward: string;
    };
    @Prop({ required: true })
    latitude: number
    @Prop({ required: true })
    longtitude: number
    @Prop({ type: [String], enum: TYPE })
    property_type: TYPE;
    @Prop({ required: true })
    rate: number;
}
