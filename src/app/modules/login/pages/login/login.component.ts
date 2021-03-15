import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/shared/models/dto/user.dto';
import { ToastService } from 'src/app/shared/services/toast.service';

import { UtilsService } from './../../../../shared/services/utils.service';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  pass: string = '';

  confirmNewPass: string = '';

  newUser: UserDTO = new UserDTO();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toast: ToastService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {}

  auth = async () => {
    console.log(this.email);
    console.log(this.pass);

    if (!this.email || !this.pass) {
      this.toast.infoErroAlert();
      return;
    }

    const result = await this.loginService.auth(
      this.email.trim(),
      this.pass.trim()
    );

    if (!result.sucess) {
      this.toast.errorAuth(result.message);
      return;
    }

    this.router.navigate(['/', 'app']);
  };

  register = async () => {
    console.log(this.newUser);

    if (!this.newUser.isValid()) {
      this.toast.infoErroAlert();
      return;
    }

    if (!this.newUser.isPassConfirmValid(this.confirmNewPass)) {
      this.toast.baseWarnAlertWithMessage('senhas incompatíveis!');
      return;
    }

    if (!this.utils.isEmailValid(this.newUser.emailUsuario)) {
      this.toast.baseWarnAlertWithMessage('email inválido, tente novamente!');
      return;
    }

    // Clear Data spaces
    this.newUser.trim();

    if (!this.newUser.isPassValid()) {
      this.toast.baseWarnAlertWithMessage('a senha deve conter ao menos 6 caracteres, tente uma nova senha!');
      return;
    }

    this.loginService.create(this.newUser).subscribe((result) => {
      console.log(result)
      if (result && !result.sucesso) {
        this.toast.errorAuth(result.mensagem);
        return;
      }

      this.router.navigate(['/', 'app']);
    });
  };
}
