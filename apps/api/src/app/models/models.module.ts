import { Global, Module } from '@nestjs/common';
import { CountriesService } from './countries/countries.service';
import { UsersService } from './users/users.service';
import { GymsService } from './gyms/gyms.service';
import { ExercisesService } from './exercises/exercises.service';
import { WorkoutsService } from './workouts/workouts.service';

const services = [
  CountriesService,
  UsersService,
  GymsService,
  ExercisesService,
  WorkoutsService
];

@Global()
@Module({
  providers: services,
  exports: services,
})
export class ModelsModule {}
