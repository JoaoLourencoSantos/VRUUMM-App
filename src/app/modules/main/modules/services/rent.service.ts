import { SummaryDTO } from './../../../../shared/models/dto/summary.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolicitationDTO } from 'src/app/shared/models/dto/solicitation.dto';

import { environment } from './../../../../../environments/environment';
import { ResponseDTO } from './../../../../shared/models/dto/response.dto';
import { AuthService } from './../../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private API_BASEPATH = environment.API_BASEPATH;

  constructor(private http: HttpClient, private auth: AuthService) {}

  find(): Observable<SolicitationDTO[]> {
    return this.http
      .get<ResponseDTO>(
        `${this.API_BASEPATH}/alugueis?codigoUsuarioLocador=${this.auth.session}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(map((result: ResponseDTO) => result.corpo));
  }

  summary(): Observable<SummaryDTO> {
    return this.http
      .get<ResponseDTO>(
        `${this.API_BASEPATH}/alugueis/resumo/${this.auth.session}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(map((result: ResponseDTO) => result.corpo));
  }
}
