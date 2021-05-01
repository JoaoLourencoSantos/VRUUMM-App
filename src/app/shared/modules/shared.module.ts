import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';

import { AproveComponent } from '../components/aprove/aprove.component';
import { CarDetailsComponent } from '../components/details/car-details/car-details.component';
import { UserDetailsComponent } from '../components/details/user-details/user-details.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { HeaderComponent } from './../components/header/header.component';
import { MaterialModule } from './material.module';

const generic = [
  HeaderComponent,
  FooterComponent,
  LoaderComponent,
  AproveComponent,
  UserDetailsComponent,
  CarDetailsComponent
];

@NgModule({
  declarations: [...generic],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, ...generic],
  providers: [
    ToastService,
    AuthService,
    LoaderService,
    NgxImageCompressService
  ],
})
export class SharedModule {}
