import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aprove',
  templateUrl: './aprove.component.html',
  styleUrls: ['./aprove.component.scss'],
})
export class AproveComponent implements OnInit {
  list = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

  constructor() {}

  ngOnInit(): void {}

  public getImage(image?: string): string {
    return image || '../../../../assets/images/default-car.png';
  }
}
