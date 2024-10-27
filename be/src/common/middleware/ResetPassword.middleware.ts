import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class ResetPasswordMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {

    const requiredFields = [
      { message: 'Email is required', field: 'email' },
      { message: 'Password is required', field: 'password' },
      { message: 'Please re-enter the password', field: 'rePassword' },
    ];
    const errors = requiredFields
      .filter(({ field }) => !req.body[field])
      .map(({ field, message }) => ({
        field,
        message,
      }));
    if (errors.length > 0) {
      throw new BadRequestException({
        message: errors.map((error) => error.message),
        field: errors.map((error) => error.field),
      });
    } else {
      if (req.body.password !== req.body.rePassword) {
        throw new BadRequestException({
          message: "The password is not the same"
        })
      }
    }
    next();
  }
}
