import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: () => void) {
        const { userName, password } = req.body;

        if (!userName || !password) {
            throw new BadRequestException('Username and password are required');
        }
        next();
    }
}
