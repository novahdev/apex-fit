import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '../common/jwt';
import { IAuthDataPayload } from './auth-data';
import { JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';
import { AuthSession } from './auth-session';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _reflector: Reflector,
    private readonly _jwtService: JwtService
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers["authorization"];
    if (!authorization) {
      throw new UnauthorizedException("No autorizado");
    }

    const token = authorization.split(" ")[1];

    try {
      const data: IAuthDataPayload = this._jwtService.verifyToken(token);
      request["session"] = new AuthSession({
        accessToken: token,
        user: data.user,
        gym: data.gym
      });
    } catch (error: unknown){
      if (error instanceof JsonWebTokenError){
        throw new UnauthorizedException("Token invalido o expirado");
      } else if (error instanceof NotBeforeError){
        throw new ForbiddenException({
          message: "El token aun no esta activo",
          data: {
            notBefore: error.date.toISOString()
          }
        });
      } else {
        throw new UnauthorizedException("No autorizado");
      }
    }

    return true;
  }
}
