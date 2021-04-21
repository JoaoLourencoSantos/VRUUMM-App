import { AddressDTO } from './../../../../../shared/models/dto/address.dto';
import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/shared/services/address.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public address: AddressDTO = new AddressDTO();

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {}

  public findAddress(): void {
    this.addressService.find(this.address.cep).subscribe((result) => {
      if (result) {
        this.address = { ...result };
      }
    });
  }
}
