import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root',
})
export class CompressService {
  constructor(private imageCompress: NgxImageCompressService) {}

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;


  public compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress
        .compressFile(image, orientation, 75, 50)
        .then((result) => {
          console.log(result);
          this.imgResultAfterCompress = result;
          console.warn(
            'Size in bytes is now:',
            this.imageCompress.byteCount(result)
          );
        });
    });
  }
}
