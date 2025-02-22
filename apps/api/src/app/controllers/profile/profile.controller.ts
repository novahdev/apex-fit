import { Auth, AuthGuard, AuthSession } from '@app/api/auth';
import { UsersService } from '@app/api/models/users';
import { ApiProfileResponse } from '@app/shared/api/profile';
import { BadRequestException, Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ProfileUpdateDto } from './dto';
import { ApiResponse } from '@app/shared/api/global/api-response.interface';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(
        private readonly _usersService: UsersService,
    ) {}

    @Get()
    public async getProfile(@Auth() session: AuthSession): Promise<ApiProfileResponse> {
        const user = await this._usersService.getUser(session.user.id);

        if (!user) {
            throw new Error('User not found');
        }

        return {
            data: {
                alias: user.alias,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                isCoach: user.isCoach,
                sex: user.sex,
                tall: user.tall,
                weight: user.weight,
                birthdate: user.birthdate.toISOString(),
                cellphone: user.cellphone,
                nationality: user.nationality,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country,
            }
        }
    }

    @Put()
    public async updateProfile(@Auth() session: AuthSession, @Body() data: ProfileUpdateDto): Promise<ApiProfileResponse> {
        const user = await this._usersService.getUser(session.user.id);

        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }

        if (data.email || data.username){
            const [email, username] = await Promise.all([
                data.email ? this._usersService.emailAvailable(data.email, user.id) : Promise.resolve(true),
                data.username ? this._usersService.usernameAvailable(data.username, user.id) : Promise.resolve(true),
            ])

            if (!email && !username){
                throw new BadRequestException('Correo electrónico y nombre de usuario en uso');
            } else if (!email){
                throw new BadRequestException('Correo electrónico en uso');
            } else if (!username){
                throw new BadRequestException('Nombre de usuario en uso');
            }
        }

        const raw = await this._usersService.updateUser(user.id, data);

        return {
            data: {
                alias: raw.alias,
                name: raw.name,
                lastName: raw.lastName,
                email: raw.email,
                username: raw.username,
                isCoach: raw.isCoach,
                sex: raw.sex,
                tall: raw.tall,
                weight: raw.weight,
                birthdate: raw.birthdate.toISOString(),
                cellphone: raw.cellphone,
                nationality: raw.nationality,
                address: raw.address,
                city: raw.city,
                state: raw.state,
                country: raw.country,
            }
        }
    }

    @Put("password")
    async updatePassword(@Auth() session: AuthSession, @Body() data: { password: string, newPassword: string }): Promise<ApiResponse> {

        const user = await this._usersService.getUser(session.user.id);

        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }

        await this._usersService.updateUser(user.id, { password: data.newPassword });

        return {
            message: "Contraseña actualizada"
        }
    }

    @Put("close-all-sessions")
    async closeAllSessions(@Auth() session: AuthSession): Promise<ApiResponse> {
        await this._usersService.updateUser(session.user.id, { jwtSecretKey: crypto.randomUUID() });

        return {
            message: "Sesiones cerradas"
        }
    }
}
