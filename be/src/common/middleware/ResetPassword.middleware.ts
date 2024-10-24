import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class ResetPassword implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const requiredFields = [
      { message: 'Email is required', field: 'email' },
      { message: 'Old password is required', field: 'oldPassword' },
      { message: 'New password is required', field: 'newPassword' },
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
    }
    next();
  }
}
