import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './property.schema';
import { BookingService } from 'src/booking/booking.service';
import { BookingModule } from 'src/booking/booking.module';
import { Booking, BookingSchema } from 'src/booking/booking.schema';
import { SessionModule } from 'src/session/session.module';
import { Session } from 'inspector/promises';
import { SessionSchema } from 'src/session/session.schema';
import { SessionService } from 'src/session/session.service';
import { JwtModule } from '@nestjs/jwt';
import { RoomService } from 'src/room/room.service';
import { RoomModule } from 'src/room/room.module';
import { Room, RoomSchema } from 'src/room/room.schema';
import { ReviewModule } from 'src/review/review.module';
import { Review, ReviewSchema } from 'src/review/review.schema';
const jwtConstant = {
  secret: 'jwtsecret',
};
@Module({
  controllers: [PropertyController],
  providers: [PropertyService, BookingService, SessionService, RoomService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Property.name,
        schema: PropertySchema,
      },
      {
        name: Booking.name,
        schema: BookingSchema,
      },
      {
        name: Session.name,
        schema: SessionSchema,
      },
      { name: Room.name, schema: RoomSchema },
      { name: Review.name, schema: ReviewSchema }
    ]),
    BookingModule,
    SessionModule,
    RoomModule,
    ReviewModule,
    JwtModule.register({
      secret: jwtConstant.secret,

      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class PropertyModule { }
