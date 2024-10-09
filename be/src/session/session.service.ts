import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './session.schema';
import { Model } from 'mongoose';
import { CreateSessionDto } from './dto/createSession.dto';

@Injectable()
export class SessionService {
    constructor(
        @InjectModel(Session.name)
        private readonly sessionSchema: Model<Session>,
    ) { }
    async createSession(createSessionDto: CreateSessionDto) {
        const { userId, data } = createSessionDto;
        const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);
        const newSession = new this.sessionSchema({
            userId: userId,
            data: data,
            expires_at: expiresAt,
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
                expires_at: new Date(new Date().getTime() + 60 * 60 * 1000),
            });
        } else {
            throw new BadRequestException('Session does not exist or has expired');
        }
    }
    async deleteSession(session: any): Promise<Session | void> {
        const { sessionId } = session;

        return this.sessionSchema.findByIdAndDelete(sessionId);
    }
}
