import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DestinationModule } from './destination/destination.module';
import { UserModule } from './user/user.module';
import { DefaultRoleMiddleware } from './common/middleware/DefaultRole.Middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { SessionModule } from './session/session.module';
import { PropertyModule } from './property/property.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';
import { AmentitesModule } from './amentites/amentites.module';
import * as admin from 'firebase-admin';
import * as serviceAccount from './config/booking-app-1edf4-4dd703c8105b.json';
import { JwtModule } from '@nestjs/jwt';
import { PromotionModule } from './promotion/promotion.module';
import { NotificationModule } from './notification/notification.module';
const jwtConstant = {
  secret: 'jwtsecret',
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    DestinationModule,
    UserModule,
    SessionModule,
    PropertyModule,

    RoomModule,
    BookingModule,
    ReviewModule,
    PaymentModule,
    AmentitesModule,
    PromotionModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return admin.initializeApp({
          credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount,
          ),
          databaseURL: 'https://booking-app-1edf4.firebaseio.com',
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DefaultRoleMiddleware).forRoutes('*');
  }
}
