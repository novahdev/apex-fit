import { CountriesService } from '@app/api/models/countries';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('data/countries')
export class CountriesController {
    constructor(private _countries: CountriesService){}

    @Get()
    public async getCountries(){
        return {
            data: await this._countries.getCountries()
        }
    }

    @Get(':country/states')
    public async getStates(@Param('country') country: string){
        return {
            data: await this._countries.getStates(country.toUpperCase())
        }
    }
    @Get(':country/states/:state/cities')
    public async getCities(@Param() data: { country: string, state: string }){
        return {
            data: await this._countries.getCities(data.state)
        }
    }
}
