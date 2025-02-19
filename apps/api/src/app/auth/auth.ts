import { createParamDecorator, ExecutionContext, HttpException } from '@nestjs/common';
import { AuthSession } from './auth-session';

export const Auth = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request&{ session: AuthSession }>();
        if (!(request.session instanceof AuthSession)) {
            throw new HttpException("Error al cargar la sesión", 500);
        }
        return request.session;
    },
);