import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor(
    public loaderService: LoaderService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
}
