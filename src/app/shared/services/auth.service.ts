import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public get isAuthenticated(): boolean {
    return this.session ? true : false;
  }

  public logout(): void {
    this.removeSession();
  }

  public get session(): number {
    const value = localStorage.getItem('user-logged');

    console.log(value);

    return parseInt(value);
  }

  private removeSession(): void {
    localStorage.removeItem('user-logged');
  }
}
