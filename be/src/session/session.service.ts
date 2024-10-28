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

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionSchema: Model<Session>,
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userSchema: Model<User>
  ) { }

  async createSession(createSessionDto: CreateSessionDto) {
    const { userId, data } = createSessionDto;

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const refreshToken = this.jwtService.sign(
      { userId: userId },
      { expiresIn: '7d' },
    );


    const newSession = new this.sessionSchema({
      userId: userId,
      data: data,
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
    return await this.sessionSchema.findByIdAndUpdate(session, {
      $addToSet: { 'data.lastViewProperties': property }
    },
      { new: true }
    )
  }
  async deleteSession(session: any): Promise<Session | void> {
    const { sessionId } = session;

    return this.sessionSchema.findByIdAndDelete(sessionId);
  }
  async refreshAccessToken(
    userId: string,
    refreshToken: string,
  ): Promise<string> {
    const isValid = await this.validationRefreshToken(userId, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const newAccessToken = this.jwtService.sign(
      { userId: userId },
      { expiresIn: '1h' },
    );
    return newAccessToken;
  }
  async validationRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const session = await this.sessionSchema
      .findOne({ userId, refreshToken })
      .exec();
    return !!session;
  }
  async signOut(userId: ObjectId) {

    return this.sessionSchema.findOneAndDelete({
      userId: userId
    })
  }
}
