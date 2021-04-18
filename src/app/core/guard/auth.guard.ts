import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AQUI');

    const isLogin = route.data.isLogin;

    console.log(isLogin);

    if (isLogin && this.auth.isAuthenticated) {
      console.log('AQUI2');
      this.router.navigate(['/', 'app', 'home']);
      return true;
    }

    if (!isLogin && !this.auth.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return false;
    }

    return true;
  }
}
