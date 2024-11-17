import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class Notification {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  partner_id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  })
  booking_id: mongoose.Types.ObjectId;

  @Prop({ required: true, enum: ['Booking', 'Payment'], default: 'Booking' })
  type: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  status: boolean;
  @Prop({ type: Date })
  expires_at: Date;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.index({ user_id: 1 });
NotificationSchema.index({ partner_id: 1 });
NotificationSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });
