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
  uid: string;
  @Prop({
    type: {
      province: {
        type: String,
        require: false,
      },
      district: {
        type: String,
        require: false,
      },
      ward: {
        type: String,
        require: false,
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
  @Prop({ type: [String], enum: ROLE, default: ROLE.PARTNER })
  role: ROLE[];
  @Prop({ required: true, default: false })
  isAdmin: boolean;
  @Prop({
    type: {
      businessName: { type: String, required: false },
      propertyType: { type: String, required: false },
      numberOfProperties: { type: Number, required: false },
      businessAddress: {
        type: {
          province: {
            type: String,
            require: false,
          },
          district: {
            type: String,
            require: false,
          },
          ward: {
            type: String,
            require: false,
          },
          street: {
            type: String,
            require: false,
          },
        },
        _id: false,
      },
    },
    _id: false,
  })
  partnerInfo?: {
    businessName: string;
    propertyType: string;
    numberOfProperties: number;
    businessAddress: {
      province: string;
      district: string;
      ward: string;
      street: string;
    };
  };
}
export const UserSchema = SchemaFactory.createForClass(User);
