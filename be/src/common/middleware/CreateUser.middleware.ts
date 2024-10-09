import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const { userName, password, dob, email, address, phoneNumber } = req.body;

    if (!userName) {
      throw new BadRequestException('Username is required');
    }
    if (!password) {
      throw new BadRequestException('Password is required');
    }
    if (!dob) {
      throw new BadRequestException('Date of birth is required');
    }
    if (!email) {
      throw new BadRequestException('Email is required');
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new BadRequestException('Invalid email format');
      }
    }
    if (!address) {
      throw new BadRequestException('Address is required');
    }
    if (!phoneNumber) {
      throw new BadRequestException('Phone number is required');
    }

    next();
  }
}
