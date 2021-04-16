import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { UploadFilesService } from './upload-files-service';
import { UploadFilesController } from './upload-files.controller';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'uploadfiles',
    })
  ],
  providers: [UploadFilesService],
  controllers: [UploadFilesController]
})
export class UploadFilesModule {}
