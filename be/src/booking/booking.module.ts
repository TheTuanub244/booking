import { Module } from '@nestjs/common';
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

const jwtConstant = {
  secret: 'jwtsecret',
};
@Module({
  controllers: [BookingController],
  providers: [BookingService, JwtAuthGuard, SessionService, UserService],
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

    ]),
    JwtModule.register({
      secret: jwtConstant.secret,

      signOptions: { expiresIn: '60m' },
    }),
    PassportModule,
    UserModule
  ]
})
export class BookingModule { }
