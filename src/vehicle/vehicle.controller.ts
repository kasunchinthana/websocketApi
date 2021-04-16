import { Controller, Get, Logger, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
    private logger = new Logger('VehicleController');
    constructor(private vehicleServie:VehicleService){

    }
    private logData(options: any) {
        options.user && this.logger.log('USER ' + JSON.stringify(options.user));
        options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
        options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
      }

      
    @Get()
    showAllVeicles(@Query('page') page: number){
        return this.vehicleServie.showAllVeicles(page);
    }
}
