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

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
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
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        let payload;
        try {
            payload = this.jwtService.verify(token);
        } catch (error) {
            payload = await admin.auth().verifyIdToken(token);
        }

        request.user = payload;

        // Now check if the user has the required roles

        if (!payload.signInfo) {
            if (payload.uid) {
                return true
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
