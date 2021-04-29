import { element } from 'protractor';
import { StoreDTO } from './../../shared/models/dto/store.dto';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SolicitationDTO } from 'src/app/shared/models/dto/solicitation.dto';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  public $data = new BehaviorSubject<StoreDTO>(new StoreDTO());

  constructor() {}

  public init(): void {
    const data = localStorage.getItem('vruumm-moment-data');

    if (!data) {
      localStorage.setItem(
        'vruumm-moment-data',
        JSON.stringify(new StoreDTO())
      );
      return;
    }

    return;
  }

  public add(value: SolicitationDTO): void {
    const data: StoreDTO = JSON.parse(
      localStorage.getItem('vruumm-moment-data')
    );

    if (!data) {
      return;
    }

    data.list.push(value);
    data.isEmpty = data.list.length === 0;

    this.populate(data);
  }

  public remove(id: String): void {
    const data: StoreDTO = JSON.parse(
      localStorage.getItem('vruumm-moment-data')
    );

    if (!data) {
      return;
    }

    console.log(data);

    data.list.filter((element) => {
      return element.id !== id;
    });

    data.isEmpty = data.list.length === 0;

    this.populate(data);
  }

  private populate(value: StoreDTO): void {
    this.$data.next(value);
    localStorage.setItem('vruumm-moment-data', JSON.stringify(value));
  }

  public getMessages(): BehaviorSubject<StoreDTO> {
    const result = localStorage.getItem('vruumm-moment-data');

    if (!result) {
      return this.$data;
    }

    this.$data.next(JSON.parse(result));
    return this.$data;
  }
}
