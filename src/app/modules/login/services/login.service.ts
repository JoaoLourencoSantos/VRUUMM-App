import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseDTO } from 'src/app/shared/models/dto/response.dto';
import { UserDTO } from 'src/app/shared/models/dto/user.dto';

import { environment } from './../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private API_BASEPATH = environment.API_BASEPATH;

  constructor(private http: HttpClient, private router: Router) {}

  auth = async (email, senha) => {
    let result: any = { sucess: true, message: null };

    await this.sendPost(email, senha)
      .toPromise()
      .then((response) => {

        if (!response.sucesso) {
          result.sucess = false;
          result.message = response.mensagem;
          return result;
        }

        this.setSessao(response.corpo);
      })
      .catch(({ error }) => {
        console.log(error);

        if (error) {
          result.sucess = false;
          result.message = error.mensagem;

          return result;
        }

        result.sucess = false;
        result.message = 'Erro no servidor';
      });

    return result;
  };

  create(body: UserDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.API_BASEPATH}/usuarios`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  sendPost(email, password): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(
      `${this.API_BASEPATH}/usuarios/autenticacao`,
      {
        emailUsuario: email,
        senhaUsuario: password,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  setSessao(identificador: any): void {
    localStorage.setItem('user-logged', JSON.stringify(identificador));
  }
}
