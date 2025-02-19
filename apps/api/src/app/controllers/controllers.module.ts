import { Global, Module } from '@nestjs/common';
import { AthletesController } from './athletes/athletes.controller';
import { CountriesController } from './countries/countries.controller';
import { AuthController } from './auth/auth.controller';
import { ProfileController } from './profile/profile.controller';

@Global()
@Module({
  controllers: [AthletesController, CountriesController, AuthController, ProfileController],
  imports: [],
  providers: []
})
export class ControllersModule {}
