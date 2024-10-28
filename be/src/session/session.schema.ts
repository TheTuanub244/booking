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
  @Prop({})
  recent_search: string;
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
SessionSchema.index(
  { last_activity: 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60 },
);
export { SessionSchema };
