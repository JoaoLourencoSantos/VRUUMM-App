import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  page: string = 'home';

  constructor(private router: Router, private authService: AuthService) {
    this.page = this.activateRoute;
  }

  ngOnInit(): void {}

  isActive(page: string) {
    return this.page === page;
  }

  get activateRoute() {
    if (!this.router.url) {
      return 'home';
    }

    const route = this.router.url.split('/');

    if (!route || route.length < 3) {
      return 'home';
    }

    return route[2];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toHome(): void {
    this.router.navigate(['/app/home']);
    this.page = 'home';
  }

  toCars(): void {
    this.router.navigate(['/app/cars']);
    this.page = 'cars';
  }

  toRents(): void {
    this.router.navigate(['/app/rents']);
    this.page = 'rents';
  }

  toProfile(): void {
    this.router.navigate(['/app/profile']);
    this.page = 'profile';
  }
}
