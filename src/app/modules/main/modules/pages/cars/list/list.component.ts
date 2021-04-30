import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CarService } from '../../../services/car.service';
import { CarDTO } from 'src/app/shared/models/dto/cart.dto';
import { EditCarComponent } from './../edit/edit.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListCarComponent implements OnInit {
  cars: CarDTO[] = [];
  public searchKey: string = null;

  private dialogRef: MatDialogRef<EditCarComponent>;

  constructor(
    public dialog: MatDialog,
    private service: CarService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.populate();
  }

  public populate(event?:any) {
    console.log(event);
    this.service.find(this.searchKey).subscribe((result) => {
      if (!result) return;

      this.cars = result;
    });
  }

  public get isEmpty() {
    return this.cars.length === 0;
  }

  public getImage(image: string): string {
    return image || '../../../../../../../assets/images/default-car.png';
  }

  public createCar(): void {
    this.dialogRef = this.dialog.open(EditCarComponent);

    this.onClose();
  }

  public editCar(car: CarDTO): void {
    this.dialogRef = this.dialog.open(EditCarComponent, {
      data: car,
    });

    this.onClose();
  }

  onClose() {
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result && result.reload) {
        this.populate();
      }
    });
  }

  public deleteCar(car: CarDTO): void {
    this.service.delete(car.codigo).subscribe((result) => {
      if (!result) return;

      if (result.sucesso) {
        this.toast.successAlert();
        this.populate();
        return;
      }

      this.toast.baseWarnAlertWithMessage(result.mensagem);
    });
  }
}
