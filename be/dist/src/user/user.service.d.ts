import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from 'src/session/session.service';
export declare class UserService {
    private userSchema;
    private jwtSerivce;
    private sessionService;
    constructor(userSchema: Model<User>, jwtSerivce: JwtService, sessionService: SessionService);
    checkEmail(email: string): Promise<true | (import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    })>;
    createUser(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    updatePassword(password: string, email: string): Promise<boolean>;
    deleteUser(id: string): Promise<import("mongodb").DeleteResult>;
    findUser(userName: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    signIn(user: any): Promise<{
        access_token: string;
        _id: Types.ObjectId;
        refreshToken: string;
    }>;
    updateUser(user: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    signUpWithEmail(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    signInWithGoggle(user: any): Promise<{
        _id: Types.ObjectId;
        refreshToken: string;
        access_token: string;
    }>;
    resetPassword(resetPassword: any): Promise<void>;
    updatePartnerAccount(partner: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    updateInformationForGoogle(user: any): Promise<{
        access_token: string;
        _id: Types.ObjectId;
        refreshToken: string;
    }>;
}
