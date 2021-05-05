import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { StoreDTO } from '../../models/dto/store.dto';
import { AuthService } from '../../services/auth.service';
import { AproveComponent } from '../aprove/aprove.component';
import { ConsumerService } from './../../../core/socket/consumer.service';
import { SocketService } from './../../../core/socket/socket.service';
import { RentService } from './../../../modules/main/modules/services/rent.service';

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
    public consumer: ConsumerService,
    private socket: SocketService,
    private restService: RentService
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
    this.socket.disconnect();
    this.restService.clear();

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
