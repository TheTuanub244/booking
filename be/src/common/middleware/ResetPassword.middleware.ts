import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class ResetPasswordMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    const requiredFields = [
      { message: 'Email is required', field: 'email' },
      { message: 'Password is required', field: 'password' },
      { message: 'Please re-enter the password', field: 'rePassword' },
    ];
    console.log(req.body);

    const errors = requiredFields
      .filter(({ field }) => !req.body[field])
      .map(({ field, message }) => ({
        field,
        message,
      }));

    if (!passwordRegex.test(req.body.password)) {
      throw new BadRequestException({
        message:
          'Invalid password. Please enter a password with at least 7 characters, including at least 1 uppercase letter, 1 number, and 1 special character.',
      });
    }

    if (errors.length > 0) {
      throw new BadRequestException({
        message: errors.map((error) => error.message),
        field: errors.map((error) => error.field),
      });
    } else {
      if (req.body.password !== req.body.rePassword) {
        throw new BadRequestException({
          message: 'The password is not the same',
        });
      }
    }
    next();
  }
}
