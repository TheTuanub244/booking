import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
import { ROLE } from './enum/role.enum';

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    userName: string;
    @Prop({ required: true })
    password: string;
    avatar: string;
    @Prop({ type: Date })
    dob: Date;
    @Prop({ type: [String], enum: ROLE, default: ROLE.MEMBER })
    role: ROLE[];
    @Prop({ required: true, default: false })
    isAdmin: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
