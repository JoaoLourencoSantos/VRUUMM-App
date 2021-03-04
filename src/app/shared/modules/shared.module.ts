import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from './../components/header/header.component';
import { BootstrapModule } from './bootstrap.module';



@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule, BootstrapModule
  ],
  exports:[HeaderComponent, FooterComponent]
})
export class SharedModule { }
