import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    return this.getSessao() ? true : false;
  }

  getSessao(): any {
    const value = localStorage.getItem('user-logged');

    console.log(value);

    return value;
  }
}
