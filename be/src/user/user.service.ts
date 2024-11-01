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
import { Model, ObjectId, Types } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase-config';
import { SessionService } from 'src/session/session.service';
import admin from 'firebase-admin';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userSchema: Model<User>,
    private jwtSerivce: JwtService,
    private sessionService: SessionService,
  ) { }
  async checkEmail(email: string) {

    const existEmail = await this.userSchema.findOne({ email: email })

    if (existEmail) {
      return false
    }
    return true
  }
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
  async updatePassword(password: string, email: string) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await this.userSchema.findOneAndUpdate({
      email: email
    }, {
      password: hashedPassword
    })
    return true
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userName)) {
      const existUser = await this.userSchema
        .findOne({
          userName: userName,
        })
        .select('+password')
        .exec();

      if (!existUser) {
        throw new UnauthorizedException('Invalid username or password');
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existUser.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid username or password');
      }
      const newSession = await this.sessionService.createSession({
        userId: existUser._id.toString(),
        lastViewProperties: [],
        lastBooking: null,
        recent_search: [],
        uid: null
      });
      const signInfo = { userName, role: existUser.role };
      return {
        access_token: this.jwtSerivce.sign({ signInfo }, { expiresIn: '1h' }),
        _id: existUser._id,
        refreshToken: newSession.refreshToken
      };
    } else {

      const existEmail = await this.userSchema.findOne({
        email: userName,
      });
      console.log(existEmail);

      if (!existEmail) {
        throw new UnauthorizedException('Invalid username or password');
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userName,
          password,
        );

        const idToken = await userCredential.user.getIdToken();

        const newSession = await this.sessionService.createSession({
          userId: existEmail._id.toString(),
          uid: null,
          lastViewProperties: [],
          lastBooking: null,
          recent_search: [],
        });

        return {
          access_token: idToken,
          _id: existEmail._id,
          refreshToken: newSession.refreshToken

        };
      } catch (err) {
        throw new UnauthorizedException('Invalid username or password');
      }
    }
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
  async signUpWithEmail(createUserDto: CreateUserDto) {
    try {
      const { userName, password, dob, email, address, phoneNumber } =
        createUserDto;
      const exist = await this.userSchema
        .findOne({
          email: email,
        })
        .exec();
      if (exist) {
        throw new BadRequestException('Email alread existed');
      }
      const existUserName = await this.userSchema.findOne({ userName })
      if (existUserName) {

        throw new BadRequestException('Username alread existed');

      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new this.userSchema({
        userName,
        dob,
        password: hashedPassword,
        email,
        address,
        phoneNumber,
        uid: userCredential.user.uid,
      });
      await sendEmailVerification(userCredential.user);
      return newUser.save();
    } catch (err) {
      throw err;
    }
  }
  async signInWithGoggle(user: any) {
    const { email, uid } = user
    const findEmail = await this.userSchema.findOne({
      email: email
    })

    if (findEmail) {
      const session = await this.sessionService.createSession({
        userId: findEmail._id.toString(),
        lastViewProperties: [],
        lastBooking: null,
        uid,
        recent_search: [],
      })

      return {
        _id: findEmail._id,
        refreshToken: session.refreshToken
      }
    } else {
      throw new BadRequestException("The email is not registered")
    }
  }
  async resetPassword(resetPassword: any) {
    const { email, password } = resetPassword;
    console.log(resetPassword);

    const findUser = await this.userSchema
      .findOne({
        email
      })
      .select('+password')
      .exec();

    admin
      .auth()
      .updateUser(findUser.uid, {
        password: password,
      })
      .then(async (userRecord) => {
        console.log(
          'Successfully updated Firebase password for user:',
          userRecord.toJSON(),
        );

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await this.userSchema.findOneAndUpdate(
          {
            email: email,
          },
          {
            password: hashedPassword,
          },
        );
      });

  }

}
