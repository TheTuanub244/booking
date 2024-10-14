import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './session.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
const jwtConstant = {
  secret: 'jwtsecret',
};
@Module({
  providers: [SessionService, JwtService],
  controllers: [SessionController],
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class SessionModule { }
