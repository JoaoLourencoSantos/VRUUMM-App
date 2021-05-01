import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CarService } from './../../../../modules/main/modules/services/car.service';
import { CarDTO } from './../../../models/dto/cart.dto';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  public carEntity: CarDTO = new CarDTO();

  constructor(
    private service: CarService,
    @Inject(MAT_DIALOG_DATA) public data: CarDTO
  ) {
    this.carEntity = { ...data };

    this.populate(data.codigo);
  }

  ngOnInit(): void {}

  private populate(code: number | string): void {
    this.service.findOne(code).subscribe((result: CarDTO) => {
      if (!result) return;

      this.carEntity = result;
    });
  }

  public getImage(image?: string): string {
    return image || '../../../../../../../assets/images/default-car.png';
  }
}
