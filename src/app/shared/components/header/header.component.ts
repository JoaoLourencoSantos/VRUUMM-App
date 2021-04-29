import { Observable, BehaviorSubject } from 'rxjs';
import { ConsumerService } from './../../../core/socket/consumer.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AproveComponent } from '../aprove/aprove.component';
import { StoreDTO } from '../../models/dto/store.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public $store: BehaviorSubject<StoreDTO>;

  page: string = 'home';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    public consumer: ConsumerService
  ) {
    this.page = this.activateRoute;
    this.$store = this.consumer.getMessages();
  }

  ngOnInit(): void {}

  public isActive(page: string) {
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

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public toHome(): void {
    this.router.navigate(['/app/home']);
    this.page = 'home';
  }

  public toCars(): void {
    this.router.navigate(['/app/cars']);
    this.page = 'cars';
  }

  public toRents(): void {
    this.router.navigate(['/app/rents']);
    this.page = 'rents';
  }

  public toProfile(): void {
    this.router.navigate(['/app/profile']);
    this.page = 'profile';
  }

  public showAproveModal(): void {
    this.dialog.open(AproveComponent);
  }
}
