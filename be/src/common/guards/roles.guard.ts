import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/user/enum/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly sessionService: SessionService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // If no roles are required, allow access
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        let payload;
        try {
            payload = this.jwtService.verify(token);
            console.log(payload);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                const refreshToken = request.cookies['refreshToken'];
                if (!refreshToken) {
                    throw new UnauthorizedException('Refresh token not found');
                }
                try {
                    // Gọi hàm refreshAccessToken với refreshToken để tạo access token mới
                    const { access_token: newAccessToken } =
                        await this.sessionService.refreshAccessToken(refreshToken);
                    response.setHeader('authorization', `Bearer ${newAccessToken}`);

                    // Xác thực lại với access token mới
                    payload = this.jwtService.verify(newAccessToken, {
                        secret: process.env.secret,
                    });
                } catch (refreshError) {
                    throw new UnauthorizedException('Failed to refresh access token');
                }
            } else {
                payload = await admin.auth().verifyIdToken(token);
            }
        }

        request.user = payload;
        if (!payload.signInfo) {
            if (payload.uid) {
                return true;
            }
        }
        if (payload.signInfo.role === ROLE.GUEST) {
            throw new UnauthorizedException(
                'You must sign in to perform this action',
            );
        }
        const hasRole = requiredRoles.some((role) =>
            payload.signInfo.role
                .map((r) => r.toLowerCase())
                .includes(role.toLowerCase()),
        );

        if (!hasRole) {
            console.log(
                'User does not have the required role:',
                requiredRoles,
                'User role:',
                payload.signInfo.role,
            );
            throw new ForbiddenException('Insufficient permissions');
        }

        return true;
    }
    private extractTokenFromHeader(request: any): string | null {
        const authHeader = request.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1]; // Extract the token
        }
        return null;
    }
}
