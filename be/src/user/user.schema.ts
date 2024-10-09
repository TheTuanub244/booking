import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
import { ROLE } from './enum/role.enum';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  userName: string;
  @Prop({ select: false })
  password: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  gender: boolean;
  @Prop()
  uid: string
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
  @Prop()
  avatar: string;
  @Prop({ required: true })
  email: string;
  @Prop({ type: Date })
  dob: Date;
  @Prop({ type: [String], enum: ROLE, default: ROLE.MEMBER })
  role: ROLE[];
  @Prop({ required: true, default: false })
  isAdmin: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
