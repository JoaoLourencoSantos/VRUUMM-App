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
    public dialogRef: MatDialogRef<EditCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarDTO
  ) {
    if (data) {
      this.carEntity = data;
      this.isUpdate = true;
    }
  }

  ngOnInit(): void {}

  public save(): void {
    console.log(this.carEntity);

    if (!this.carEntity.isValid()) {
      this.toast.baseWarnAlertWithMessage('Preencha os campos obrigatórios!!');

      return;
    }

    if (!this.carEntity.isNumberSeatsValid()) {
      this.toast.baseWarnAlertWithMessage(
        'A quantidade de assentos deve ser menor que 12!'
      );
      return;
    }

    this.dialogRef.close();
  }

  public getImage(image?: string): string {
    return image || '../../../../../../../assets/images/default-car.png';
  }

  public changeAvailability(event: any): void {
    console.log(event);
  }
}
