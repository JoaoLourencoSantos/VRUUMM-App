import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { EditCarComponent } from './pages/cars/edit/edit.component';
import { ListCarComponent } from './pages/cars/list/list.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@NgModule({
  declarations: [HomeComponent, ListCarComponent, EditCarComponent],
  imports: [CommonModule, PagesRoutingModule, MaterialModule],
})
export class PagesModule {}
