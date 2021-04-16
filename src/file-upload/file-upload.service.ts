import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { getConnection } from 'typeorm';

@Injectable()
@Processor('fileupload')
export class FileUploadService {
    private readonly logger = new Logger(FileUploadService.name);
  
 // var csv = require('fast-csv');
  @Process('upload')
  async handleTranscode(job: Job) {
    this.logger.debug(job.data);
     // can be used once createConnection is called and is resolved
     const connection = getConnection();
//await connection.connect();
    this.logger.debug(job.data);
    //let csvToJson = require('convert-csv-to-json');
    this.logger.debug('Start transcoding...');
    //const pool = require('./pgdb');
    //this.logger.debug(getConnection().);
    
    //await connection.connect();
    //this.logger.debug(connection.connect());
    this.logger.debug(job.data);
    this.logger.debug(job.data);
   // let json = csvToJson.getJsonFromCsv(job.data.file);
   // this.logger.debug(json.last_name);
    const csv = require('csv-parser');
    const fs = require('fs');

  fs.createReadStream(job.data.file).pipe(csv()).on('data', (row) => {
    let datetime = new Date().toString();
    let first_name = row.first_name;
    let last_name = row.last_name;
    let email = row.email;
    let car_make = row.car_make;
    let car_model = row.car_model;
    let vin_number = row.vin_number;
    let manufactured_date = row.manufactured_date;
    let manufactreDateInMilySec = Date.parse(manufactured_date);
    let curDateInMilySec = Date.parse(datetime);
    let age_of_vehicle = (curDateInMilySec - manufactreDateInMilySec)/(365*3600*24*1000) ;
    
    connection.query("SELECT * FROM vehicle where first_name='Abdul'" );

  //   connection.query("INSERT INTO vehicle(first_name, last_name, email, car_make, car_model, vin_number, manufactured_date,age_of_vehicle) \
  // VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [first_name, last_name, email, car_make, car_model, vin_number, manufactured_date,age_of_vehicle],
  //     );
      console.log(row);
      
    }).on('end', () => {console.log('CSV file successfully processed');
  });
}
}
