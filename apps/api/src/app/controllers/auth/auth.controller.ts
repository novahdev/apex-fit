import { Body, Controller, Headers, HttpException, Post } from '@nestjs/common';
import { ApiAuthResponse } from '@app/shared/api/auth/api-auth-interfaces';
import { UsersService } from '@app/api/models/users';
import { LoginDto } from './dto';
import { JwtService } from '@app/api/common/jwt';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly _usersService: UsersService,
        private readonly _jwt: JwtService
    ){}

    @Post('login')
    public async login(@Body() body: LoginDto): Promise<ApiAuthResponse> {
        const user = await this._usersService.getUser(body.username);

        if (!user){
            throw new HttpException("Usuario invalido.", 400);
        }

        if (!(await user.matchPassword(body.password))){
            throw new HttpException("Contraseña invalida.", 400);
        }

        const { accessToken, refreshToken } = await user.generateTokens();
        
        return {
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    role: user.role,
                    alias: user.alias,
                    isCoach: user.isCoach,
                }
            }
        };
    }

    @Post('refresh')
    public async refreshToken(@Headers('Authorization') authorization?: string): Promise<ApiAuthResponse> {
        if (!authorization){
            throw new HttpException("Token invalido.", 400);
        }
        if (!authorization.startsWith('Bearer ')){
            throw new HttpException("Token invalido.", 400)
        }
        const token = authorization.split(' ')[1];

        const data: { id: string } =  this._jwt.decode(token);
        const user = await this._usersService.getUser(data.id);
        if (!user){
            throw new HttpException("Usuario invalido.", 400);
        }

        if (user.status !== "ACTIVE"){
            throw new HttpException("Usuario bloqueado.", 401);
        }

        const { accessToken, refreshToken } = await user.generateTokens();

        return {
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    role: user.role,
                    alias: user.alias,
                    isCoach: user.isCoach,
                }
            }
        };
    }
}
