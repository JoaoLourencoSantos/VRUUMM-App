import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditCarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public getImage(image?: string): string {
    return image || '../../../../../../../assets/images/default-car.png';
  }
}
