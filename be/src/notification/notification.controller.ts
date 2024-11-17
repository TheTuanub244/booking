import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ObjectId } from 'mongoose';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post()
  createNotification(@Body() data: any) {
    return this.notificationService.createNotification(data);
  }

  @Get(':userId/unseen')
  getUnseenNoti(@Param('userId') userId: ObjectId) {
    return this.notificationService.getUnseenNoti(userId);
  }
  @Get(':userId/unread')
  getSeenNoti(@Param('userId') userId: ObjectId) {
    return this.notificationService.getSeenNoti(userId);
  }
}
