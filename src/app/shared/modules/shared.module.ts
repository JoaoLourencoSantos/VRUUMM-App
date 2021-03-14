import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from './../components/header/header.component';
import { BootstrapModule } from './bootstrap.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, BootstrapModule, MaterialModule],
  exports: [HeaderComponent, FooterComponent, MaterialModule, BootstrapModule],
})
export class SharedModule {}
