import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: () => void) {
        const { userName, password } = req.body;

        if (!userName) {
            throw new BadRequestException({
                message: ['Username and password are required'],
                field: ['userName'],
            });
        }
        if (!password) {
            throw new BadRequestException({
                message: ['Username and password are required'],
                field: ['password'],
            });
        }
        if (!userName && !password) {
            throw new BadRequestException({
                message: ['Username and password are required'],
                field: ['password', 'userName'],
            });
        }
        next();
    }
}
