import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadFilesModule } from './upload-files/upload-files.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './util/http-error.filter';
import { LoggingInterceptor } from './util/logging.intercepter';
import { Connection } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { VehicleModule } from './vehicle/vehicle.module';
import { FileUploadModule } from './file-upload/file-upload.module';


@Module({
  imports: [TypeOrmModule.forRoot(), UploadFilesModule, BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),MulterModule.register({
    dest:'./uploads'
  }),VehicleModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_FILTER,
    useClass:HttpErrorFilter
  },{
    provide:APP_INTERCEPTOR,
    useClass:LoggingInterceptor
  }],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
