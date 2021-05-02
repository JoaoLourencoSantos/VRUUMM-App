import { UserService } from './../../../../modules/main/modules/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimpleUserDTO } from './../../../models/dto/simple.user.dto';
import { Component, OnInit, Inject } from '@angular/core';
import { AddressDTO } from 'src/app/shared/models/dto/address.dto';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public userEntity: SimpleUserDTO = new SimpleUserDTO();

  constructor(
    private service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: SimpleUserDTO
  ) {
    this.userEntity = { ...data };
    this.userEntity.endereco = new AddressDTO();

    this.populate(data.codigo);
  }

  ngOnInit(): void {}

  private populate(code: number | string): void {
    this.service.findOne(code).subscribe((result: SimpleUserDTO) => {
      if (!result) return;

      this.userEntity = result;

      if (!this.userEntity.endereco) {
        this.userEntity.endereco = new AddressDTO();
      }
    });
  }

  public getImage(name?: string): string {
    return (
      `https://ui-avatars.com/api/?color=787878&name=${name}` ||
      '../../../../../../../assets/images/default-car.png'
    );
  }
}
