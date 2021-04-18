import { environment } from './../../../environments/environment.prod';
import { AddressDTO } from './../models/dto/address.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private VIA_CEP = environment.VIA_CEP;

  constructor(private http: HttpClient) {}

  find(cep: string): Observable<AddressDTO> {
    return this.http.get<AddressDTO>(`${this.VIA_CEP}/${cep}/json/`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
