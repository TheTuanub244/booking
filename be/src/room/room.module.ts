import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.schema';
import { Review, ReviewSchema } from 'src/review/review.schema';
import { BookingService } from 'src/booking/booking.service';
import { BookingModule } from 'src/booking/booking.module';
import { Booking, BookingSchema } from 'src/booking/booking.schema';
import { SessionModule } from 'src/session/session.module';
import { SessionService } from 'src/session/session.service';
import { Session } from 'inspector/promises';
import { SessionSchema } from 'src/session/session.schema';
import { JwtModule } from '@nestjs/jwt';
import { PropertyModule } from 'src/property/property.module';
import { Property, PropertySchema } from 'src/property/property.schema';
const jwtConstant = {
  secret: 'jwtsecret',
};
@Module({
  controllers: [RoomController],
  providers: [RoomService, BookingService, SessionService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
      {
        name: Review.name,
        schema: ReviewSchema,
      },
      {
        name: Booking.name,
        schema: BookingSchema,
      },
      {
        name: Session.name,
        schema: SessionSchema,
      },
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstant.secret,

      signOptions: { expiresIn: '60m' },
    }),
    BookingModule,
    SessionModule,
  ],
})
export class RoomModule { }
