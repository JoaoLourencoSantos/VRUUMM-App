import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root',
})
export class CompressService {
  constructor(private imageCompress: NgxImageCompressService) {}

  public compressFile(): Observable<string> {
    return new Observable<string>((observer) => {
      this.imageCompress.uploadFile().then(({ image, orientation }) => {
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 65, 30)
          .then((result) => {
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );

            observer.next(result);
          });
      });
    });
  }
}
