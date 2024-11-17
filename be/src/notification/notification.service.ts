import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationSchema: Model<Notification>,
  ) {}
  async getUnseenNoti(user_id: ObjectId) {
    return this.notificationSchema
      .find({ user_id, status: false })
      .sort({ created_at: -1 });
  }
  async getSeenNoti(user_id: ObjectId) {
    return this.notificationSchema
      .find({ user_id, status: true })
      .sort({ created_at: -1 });
  }
  async markAsRead(notificationId: ObjectId) {
    return this.notificationSchema.findByIdAndUpdate(
      notificationId,
      { status: true },
      { new: true },
    );
  }
  async deleteOldNotifications() {
    return this.notificationSchema.deleteMany({
      expires_at: { $lte: new Date() },
    });
  }
  async createNotification(notification: any) {
    const newNoti = new this.notificationSchema(notification);
    return await newNoti.save();
  }
}
