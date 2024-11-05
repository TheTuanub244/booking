import { forwardRef, Module } from '@nestjs/common';
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
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { Promotion, PromotionSchema } from 'src/promotion/promotion.schema';
import { PromotionModule } from 'src/promotion/promotion.module';
const jwtConstant = {
  secret: 'jwtsecret',
};
@Module({
  controllers: [RoomController],
  providers: [RoomService, BookingService, SessionService, UserService],
  exports: [RoomService], // Ensure to export services needed by other modules
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: Promotion.name, schema: PromotionSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Property.name, schema: PropertySchema },
      { name: User.name, schema: UserSchema }
    ]),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '60m' },
    }),
    forwardRef(() => SessionModule),
    forwardRef(() => BookingModule),
    forwardRef(() => UserModule),
    forwardRef(() => PromotionModule),
    PropertyModule,
  ],
})
export class RoomModule { }