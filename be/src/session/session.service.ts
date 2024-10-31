import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './session.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateSessionDto } from './dto/createSession.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';
import * as admin from 'firebase-admin';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionSchema: Model<Session>,
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userSchema: Model<User>,
  ) { }

  async createSession(createSessionDto: CreateSessionDto) {
    const { userId, lastViewProperties, lastBooking } = createSessionDto;

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const refreshToken = this.jwtService.sign(
      { userId: userId },
      { expiresIn: '7d' },
    );
    await this.sessionSchema.deleteMany({ userId });

    const newSession = new this.sessionSchema({
      userId: userId,
      lastViewProperties: lastViewProperties,
      lastBooking: lastBooking,
      expires_at: expiresAt,
      refreshToken,
      last_activity: Date.now(),
    });

    return newSession.save();
  }

  async getSession(id: any) {
    const { sessionId } = id;

    const session = await this.sessionSchema
      .findById(sessionId)
      .populate('userId')
      .exec();

    return session;
  }
  async getSessionByUserId(userId: any) {
    const session = await this.sessionSchema
      .findOne({
        userId: userId,
      })
      .populate('userId')
      .populate({
        path: 'data.lastBooking',
        populate: { path: 'property' },
      })
      .populate('data.lastViewProperties')

      .exec();
    return session;
  }
  async updateSession(session: any): Promise<Session> {
    const { sessionId, data } = session;
    const existSession = await this.sessionSchema.findById(sessionId).exec();

    if (existSession && existSession.expires_at > new Date()) {
      return existSession.updateOne({
        last_activity: new Date(),
        data: data,
      });
    } else {
      throw new BadRequestException('Session does not exist or has expired');
    }
  }
  async updateLastPropertyView(session: ObjectId, property: ObjectId) {
    return await this.sessionSchema.findByIdAndUpdate(
      session,
      {
        $addToSet: { 'data.lastViewProperties': property },
      },
      { new: true },
    );
  }
  async deleteSession(session: any): Promise<Session | void> {
    const { sessionId } = session;

    return this.sessionSchema.findByIdAndDelete(sessionId);
  }

  async refreshAccessToken(
    userId: ObjectId,
    accessToken: string
  ) {
    console.log(accessToken);

    const findSession = await this.sessionSchema.findOne({ userId })
    const isValid = await this.validationRefreshToken(userId, findSession.refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Your session has expired');
    }
    try {
      const verifyAccessToken = await this.jwtService.verify(accessToken, { secret: 'jwtsecret' })
      const issuedAtDate = new Date(verifyAccessToken.iat * 1000);
      const expirationDate = new Date(verifyAccessToken.exp * 1000);
      if (issuedAtDate > expirationDate) {
        const newAccessToken = await this.jwtService.sign(
          {
            userId: userId,
          },
          { expiresIn: '60m' }
        )
        return {
          accessToken: newAccessToken
        }
      }
    } catch (err) {
      const verifyAccessToken = await admin.auth().verifyIdToken(accessToken)
      const issuedAtDate = new Date(verifyAccessToken.iat * 1000);
      const expirationDate = new Date(verifyAccessToken.exp * 1000);
      if (issuedAtDate > expirationDate) {
        throw new BadRequestException('Your session has expired')
      } else {
        return {
          accessToken
        }
      }
    }

    // return newAccessToken;
  }
  async validationRefreshToken(
    userId: ObjectId,
    refreshToken: string,
  ): Promise<boolean> {
    const session = await this.sessionSchema
      .findOne({ userId, refreshToken })
      .exec();
    const verifyRefreshToken = await this.jwtService.verify(session.refreshToken, { secret: 'jwtsecret' })
    const issuedAtDate = new Date(verifyRefreshToken.iat * 1000);
    const expirationDate = new Date(verifyRefreshToken.exp * 1000);


    if (issuedAtDate > expirationDate) {
      return false
    }
    return true

  }
  async signOut(userId: ObjectId) {
    return this.sessionSchema.findOneAndDelete({
      userId: userId,
    });
  }
  async getRecentSearch(userId: ObjectId) {
    const findSession = await this.sessionSchema.findOne({ userId: userId });
    return findSession.recent_search;
  }
  async getSessionHistory(userId: ObjectId) {
    const session = await this.sessionSchema.findOne({ userId })
    await session.populate('lastViewProperties');
    await session.populate('lastBooking')
    return {
      lastViewProperties: session.lastViewProperties,
      lastBookng: session.lastBooking,
      recent_search: session.recent_search
    }

  }
}
