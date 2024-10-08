import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { ValidationMiddleware } from 'src/common/middleware/Authentication.middleware';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';
const jwtConstant = {
  secret: 'jwtsecret',
};
@Module({
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService, JwtModule],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes(
        { path: '/user/sign-up', method: RequestMethod.POST },
        { path: '/user/sign-in', method: RequestMethod.POST },
      );
  }
}
