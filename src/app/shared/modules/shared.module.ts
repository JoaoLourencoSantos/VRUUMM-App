import { SocketService } from './../services/socket.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { FooterComponent } from '../components/footer/footer.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { HeaderComponent } from './../components/header/header.component';
import { MaterialModule } from './material.module';

import { NgxImageCompressService } from 'ngx-image-compress';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ToastService,
    AuthService,
    LoaderService,
    NgxImageCompressService,
    SocketService
  ],
})
export class SharedModule {}
