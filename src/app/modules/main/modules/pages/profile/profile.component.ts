import { Component, OnInit } from '@angular/core';
import { ResponseDTO } from 'src/app/shared/models/dto/response.dto';
import { UserPatchDTO } from 'src/app/shared/models/dto/user.patch.dto';
import { AddressService } from 'src/app/shared/services/address.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { SimpleUserDTO } from '../../../../../shared/models/dto/simple.user.dto';
import { AddressDTO } from './../../../../../shared/models/dto/address.dto';
import { ToastService } from './../../../../../shared/services/toast.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public address: AddressDTO = new AddressDTO();
  public user: SimpleUserDTO = new SimpleUserDTO();

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private toastService: ToastService,
    private utils: UtilsService
  ) {
    this.findUser();
  }

  ngOnInit(): void {}

  public findAddress(): void {
    if (!this.address.cep) {
      this.toastService.baseWarnAlertWithMessage('Insira um CEP válido!');
      return;
    }

    this.addressService.find(this.address.cep).subscribe((result) => {
      if (result) {
        this.address = { ...result };
      }
    });
  }

  public findUser(): void {
    this.userService.find().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.user = { ...result };

        if (this.user.endereco) {
          this.address = { ...this.user.endereco };
        }
      }
    });
  }

  public update(): void {
    this.user.endereco = { ...this.address };

    if (!SimpleUserDTO.isValid(this.user)) {
      this.toastService.infoErroAlert();
      return;
    }

    if (!this.utils.isEmailValid(this.user.email)) {
      this.toastService.baseWarnAlertWithMessage(
        'email inválido, tente novamente!'
      );
      return;
    }

    SimpleUserDTO.trim(this.user);

    this.userService
      .update(new UserPatchDTO(this.user))
      .subscribe((result: ResponseDTO) => {
        if (result && !result.sucesso) {
          this.toastService.errorAlertWithMessage(result.mensagem);
          return;
        }

        this.toastService.successAlert();

        this.findUser();
      });
  }
}
