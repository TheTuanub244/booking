import { forwardRef, Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './booking.schema';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionService } from 'src/session/session.service';
import { Session, SessionSchema } from 'src/session/session.schema';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { Promotion, PromotionSchema } from 'src/promotion/promotion.schema';
import { PromotionModule } from 'src/promotion/promotion.module';
import { Room, RoomSchema } from 'src/room/room.schema';
import { RoomModule } from 'src/room/room.module';
import { SessionModule } from 'src/session/session.module';

const jwtConstant = {
  secret: 'jwtsecret',
};
@Module({
  controllers: [BookingController],
  providers: [BookingService, JwtAuthGuard, SessionService, UserService],
  exports: [BookingService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
      {
        name: Session.name,
        schema: SessionSchema,
      },
      { name: User.name, schema: UserSchema },
      { name: Promotion.name, schema: PromotionSchema },
      { name: Room.name, schema: RoomSchema }
    ]),
    JwtModule.register({
      secret: jwtConstant.secret,

      signOptions: { expiresIn: '60m' },
    }),
    PassportModule,
    UserModule,
    PromotionModule,
    forwardRef(() => RoomModule),
    forwardRef(() => SessionModule),

  ]
})
export class BookingModule { }
