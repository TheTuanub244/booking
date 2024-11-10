import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    signUpWithEmail(signup: any): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    signIn(user: any, response: Response): Promise<Response<any, Record<string, any>>>;
    checkEmail(email: any): Promise<true | (import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    })>;
    updatePassword(password: any): Promise<boolean>;
    signInWithEmail(user: any, response: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(user: any): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    resetPassword(resetPassword: any): Promise<void>;
    updatePartnerAccount(partner: any): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    updateInformationForGoogle(user: any, response: Response): Promise<Response<any, Record<string, any>>>;
}