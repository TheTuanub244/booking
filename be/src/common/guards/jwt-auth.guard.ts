import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';
import { Reflector } from '@nestjs/core';
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Invalid or missing token');
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(request.body.userName)) {
            try {
                const payload = await this.jwtService.verify(token)
                console.log(payload);

                if (payload.userName === request.body.userName)
                    return payload.user
            } catch (err) {
                throw new UnauthorizedException('Invalid or missing token');

            }
        } else {
            try {
                const payload = await admin.auth().verifyIdToken(token)

                if (payload.email === request.body.userName) {
                    return payload.user
                }
            }
            catch (err) {
                throw new UnauthorizedException('Invalid or missing token');

            }
        }


    }
    private extractTokenFromHeader(request: any): string | null {
        const authHeader = request.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1]; // Extract the token
        }
        return null;
    }
}
