import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    return this.session ? true : false;
  }

  public logout(): void {
    this.removeSession();
  }

  private get session(): any {
    const value = localStorage.getItem('user-logged');

    console.log(value);

    return value;
  }

  private removeSession(): void {
    localStorage.removeItem('user-logged');
  }
}
