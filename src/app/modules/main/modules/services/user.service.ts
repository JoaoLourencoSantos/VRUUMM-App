import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDTO } from 'src/app/shared/models/dto/response.dto';
import { AuthService } from 'src/app/shared/services/auth.service';

import { SimpleUserDTO } from '../../../../shared/models/dto/simple.user.dto';
import { environment } from './../../../../../environments/environment';
import { UserPatchDTO } from './../../../../shared/models/dto/user.patch.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_BASEPATH = environment.API_BASEPATH;

  constructor(private http: HttpClient, private auth: AuthService) {}

  find(): Observable<any> {
    return this.http
      .get<ResponseDTO>(`${this.API_BASEPATH}/usuarios/${this.auth.session}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(map((result: ResponseDTO) => result.corpo));
  }

  update(entity: UserPatchDTO): Observable<ResponseDTO> {
    return this.http.patch<ResponseDTO>(
      `${this.API_BASEPATH}/usuarios/${this.auth.session}`,
      entity,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
