import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarDTO } from 'src/app/shared/models/dto/cart.dto';
import { ResponseDTO } from 'src/app/shared/models/dto/response.dto';

import { environment } from '../../../../../environments/environment';
import { AuthService } from './../../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private API_BASEPATH = environment.API_BASEPATH;

  constructor(private http: HttpClient, private auth: AuthService) {}

  find(key: string): Observable<CarDTO[]> {
    let query = `codigoUsuarioDonoDoCarro=${this.auth.session}`;

    if (key) {
      query += `&termo=${key}`;
    }

    return this.http
      .get<ResponseDTO>(`${this.API_BASEPATH}/carros/buscaGenerica?${query}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(map((result: ResponseDTO) => result.corpo));
  }

  findOne(code: number | string): Observable<CarDTO> {
    return this.http
      .get<ResponseDTO>(`${this.API_BASEPATH}/carros/${code}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(map((result: ResponseDTO) => result.corpo));
  }

  create(car: CarDTO): Observable<ResponseDTO> {
    car.codigoUsuarioDonoDoCarro = this.auth.session;
    return this.http.post<ResponseDTO>(`${this.API_BASEPATH}/carros`, car, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  update(car: CarDTO): Observable<ResponseDTO> {
    car.codigoUsuarioDonoDoCarro = this.auth.session;
    return this.http.patch<ResponseDTO>(
      `${this.API_BASEPATH}/carros/${car.codigo}`,
      car,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  delete(codigo: number | string): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(
      `${this.API_BASEPATH}/carros/${codigo}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
