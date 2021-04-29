import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ConsumerService } from './../../../core/socket/consumer.service';
import { StoreDTO } from './../../models/dto/store.dto';

@Component({
  selector: 'app-aprove',
  templateUrl: './aprove.component.html',
  styleUrls: ['./aprove.component.scss'],
})
export class AproveComponent implements OnInit {
  public $store: BehaviorSubject<StoreDTO>;

  constructor(public consumer: ConsumerService) {
    this.$store = consumer.getMessages();
  }

  ngOnInit(): void {}

  public getImage(image?: string): string {
    return image || '../../../../assets/images/default-car.png';
  }
}
