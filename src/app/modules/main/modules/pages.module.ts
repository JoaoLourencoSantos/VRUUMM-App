import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { MaterialModule } from 'src/app/shared/modules/material.module';

import { PagesRoutingModule } from './pages-routing.module';
import { EditCarComponent } from './pages/cars/edit/edit.component';
import { ListCarComponent } from './pages/cars/list/list.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListCarComponent,
    EditCarComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    MaterialModule,
    NgxCurrencyModule,
  ],
})
export class PagesModule {}
