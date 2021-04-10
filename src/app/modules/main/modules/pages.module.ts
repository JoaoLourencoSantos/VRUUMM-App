import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { EditCarComponent } from './pages/cars/edit/edit.component';
import { ListCarComponent } from './pages/cars/list/list.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [HomeComponent, ListCarComponent, EditCarComponent],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    MaterialModule,NgxCurrencyModule
  ],
})
export class PagesModule {}
