import { Module } from '@nestjs/common';
import { ImageService } from './images.service.js';

@Module({
  providers: [ ImageService ],
  exports: [ ImageService ],
})
export class ImagesModule {}
