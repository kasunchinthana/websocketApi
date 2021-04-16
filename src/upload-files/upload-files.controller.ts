import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('uploadfiles')
export class UploadFilesController {

    constructor(@InjectQueue('uploadfiles') private readonly dbProcessQueue: Queue) {}

    
    @Post('transcode')
    async transcode() {
        const path = require('path')
        //this file shoud come from front end upload csv file
        
      await this.dbProcessQueue.add('transcode', {
        file: path.resolve('E:\Rapidassignmentdata.csv'),
      });
    }
}


