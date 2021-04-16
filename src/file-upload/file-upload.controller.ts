import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';

@Controller('fileupload')
export class FileUploadController {

    constructor(@InjectQueue('fileupload') private readonly dbfileUploadQueue: Queue) {}
    
    // @Post("upload")
    // @UseInterceptors(FileInterceptor("file", { dest: "./uploads" }))
    // uploadSingle(@UploadedFile() file) {
    //     console.log(file.path);
    //     console.log(file);
    // }

    @Post("upload")
    @UseInterceptors(FileInterceptor("file", { dest: "./uploads" }))
    async transcode(@UploadedFile() file) {
        const path = require('path')
        //this file shoud come from front end upload csv file
        console.log(file.path);
      await this.dbfileUploadQueue.add('upload', {
        file: path.resolve(file.path),
      });
    }

}
