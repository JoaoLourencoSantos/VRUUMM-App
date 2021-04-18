import { NgxImageCompressService } from 'ngx-image-compress';
import { CompressService } from './../../../../../../shared/services/compress.service';
import { CarService } from './../../../services/car.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarDTO } from 'src/app/shared/models/dto/cart.dto';

import { ToastService } from './../../../../../../shared/services/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditCarComponent implements OnInit {
  public carEntity: CarDTO = new CarDTO();
  public isUpdate: boolean = false;

  constructor(
    private toast: ToastService,
    private service: CarService,
    public dialogRef: MatDialogRef<EditCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarDTO,
    private imageCompress: NgxImageCompressService
  ) {
    if (data) {
      this.carEntity = data;
      this.isUpdate = true;
    }
  }

  ngOnInit(): void {}

  public save(): void {
    console.log(this.carEntity);

    if (!CarDTO.isValid(this.carEntity)) {
      this.toast.baseWarnAlertWithMessage('Preencha os campos obrigatórios!!');

      return;
    }

    if (!CarDTO.isNumberSeatsValid(this.carEntity)) {
      this.toast.baseWarnAlertWithMessage(
        'A quantidade de assentos deve ser menor que 12!'
      );
      return;
    }

    if (this.isUpdate) {
      this.update();
      return;
    }

    this.create();
  }

  create() {
    this.service.create(this.carEntity).subscribe((result) => {
      if (!result) return;

      if (result.sucesso) {
        this.toast.successAlert();
        this.dialogRef.close({ reload: true });
      } else {
        this.toast.baseWarnAlertWithMessage(result.mensagem);
      }
    });
  }

  update() {
    this.service.update(this.carEntity).subscribe((result) => {
      if (!result) return;

      if (result.sucesso) {
        this.toast.successAlert();
        this.dialogRef.close({ reload: true });
      } else {
        this.toast.baseWarnAlertWithMessage(result.mensagem);
      }
    });
  }

  public getImage(image?: string): string {
    return image || '../../../../../../../assets/images/default-car.png';
  }

  public changeAvailability(event: any): void {
    console.log(event);
  }

  public compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress
        .compressFile(image, orientation, 75, 50)
        .then((result) => {
          console.log(result);
          this.carEntity.imagem = result;
          console.warn(
            'Size in bytes is now:',
            this.imageCompress.byteCount(result)
          );
        });
    });
  }
}
