import {
    BadRequestException,
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userSchema: Model<User>,
        private jwtSerivce: JwtService,
    ) { }
    async createUser(createUserDto: CreateUserDto) {
        const { userName, password } = createUserDto;

        const existedUser = await this.userSchema
            .findOne({
                userName: userName,
            })
            .exec();

        if (existedUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new this.userSchema({ userName, password: hashedPassword });
        return newUser.save();
    }
    async deleteUser(id: string) {
        const objectId = new Types.ObjectId(id);
        const existUser = await this.userSchema
            .findOne({
                _id: objectId,
            })
            .exec();
        if (!existUser) {
            throw new BadRequestException('Invalid ID');
        }
        return this.userSchema.deleteOne({
            _id: id,
        });
    }
    async findUser(userName: string) {
        const user = await this.userSchema
            .findOne({
                userName: userName,
            })
            .exec();
        return user;
    }
    async signUp(createUserDto: CreateUserDto) {
        const { userName, password } = createUserDto;
        const exist = await this.userSchema
            .findOne({
                userName: userName,
            })
            .exec();
        console.log(exist);

        if (exist) {
            throw new UnauthorizedException('Username already existed');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new this.userSchema({
            userName: userName,
            password: hashedPassword,
        });
        return newUser.save();
    }

    async signIn(user: any) {
        const { userName, password, role } = user;
        const existUser = await this.userSchema
            .findOne({
                userName: userName,
            })
            .exec();
        if (!existUser) {
            throw new UnauthorizedException('Invalid username or password');
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            existUser.password,
        );
        console.log(existUser);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return { access_token: this.jwtSerivce.sign(user) };
    }
}
