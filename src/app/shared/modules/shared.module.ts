import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from '../components/footer/footer.component';
import { ToastService } from '../services/toast.service';
import { HeaderComponent } from './../components/header/header.component';
import { BootstrapModule } from './bootstrap.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    BootstrapModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MaterialModule,
    BootstrapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ToastService],
})
export class SharedModule {}
