import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Booking } from 'src/booking/booking.schema';
import { User } from 'src/user/user.schema';

@Schema()
export class Session {
  @Prop({
    unique: true,
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  })
  userId: User;
  @Prop({
    type: {
      lastViewProperties: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Property'
      },
      lastBooking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    },
    _id: false,
  })
  data: {
    lastViewProperties: ObjectId[];
    lastBooking: Booking;
  };
  @Prop({
    type: [
      {
        province: {
          type: String,
        },
        check_in: {
          type: Date,
        },
        check_out: {
          type: Date,
        },
        capacity: {
          adults: {
            type: Number,
          },
          childs: {
            count: {
              type: Number,
            },
            age: {
              type: Number,
            },
          },
        },
      },
    ],
  })
  recent_search: {
    province: string;
    check_in: Date;
    check_out: Date;
    capacity: {
      adults: number;
      childs: {
        age: number;
        count: number;
      };
    };
  }[];
  @Prop({})
  uid: string;
  @Prop({ type: Date, default: Date.now() })
  last_activity: Date;
  @Prop({
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
    index: { expireAfterSeconds: 0 },
  })
  expires_at: Date;
  @Prop({ required: true })
  refreshToken: string;
}
const SessionSchema = SchemaFactory.createForClass(Session);
SessionSchema.pre('save', function (next) {
  if (this.data.lastViewProperties.length > 4) {
    this.data.lastViewProperties = this.data.lastViewProperties.slice(-4);
  }

  if (this.recent_search.length > 4) {
    this.recent_search = this.recent_search.slice(-4);
  }

  next();
});
SessionSchema.index(
  { last_activity: 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60 },
);
export { SessionSchema };
