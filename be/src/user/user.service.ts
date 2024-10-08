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
        const { userName, password, dob, email, address, phoneNumber } =
            createUserDto;

        const existedUser = await this.userSchema
            .findOne({
                userName: userName,
            })
            .exec();
        console.log(address);

        if (existedUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new this.userSchema({
            userName,
            password: hashedPassword,
            dob,
            email,
            address,
            phoneNumber,
        });
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
    async findUser(userName: any) {

        const user = await this.userSchema
            .findOne({
                userName: userName.userName,
            })
            .exec();
        return user;
    }
    async signUp(createUserDto: CreateUserDto) {
        const { userName, password, dob, email, address, phoneNumber } =
            createUserDto;
        const exist = await this.userSchema
            .findOne({
                userName: userName,
            })
            .exec();

        if (exist) {
            throw new UnauthorizedException('Username already existed');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new this.userSchema({
            userName,
            password: hashedPassword,
            dob,
            email,
            address,
            phoneNumber,
        });
        return newUser.save();
    }

    async signIn(user: any) {
        const { userName, password } = user;
        const existUser = await this.userSchema
            .findOne({
                userName: userName,
            })
            .exec();
        if (!existUser) {
            throw new UnauthorizedException('Invalid username or password');
        }
        const isPasswordValid = await bcrypt.compare(password, existUser.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid username or password');
        }
        const signInfo = { userName, role: existUser.role }
        return { access_token: this.jwtSerivce.sign(signInfo) };
    }
    async updateUser(user: any) {
        const { userName, dob, email, address, phoneNumber, role } = user;
        const isAdmin = role.some((idx) => idx == 'admin');

        const findUser = await this.userSchema.findOneAndUpdate(
            {
                userName: userName,
            },
            {
                $set: {
                    userName,
                    dob,
                    email,
                    address,
                    phoneNumber,
                    role,
                    isAdmin: isAdmin,
                },
            },
            { new: true },
        );
        return findUser.save();
    }
}
