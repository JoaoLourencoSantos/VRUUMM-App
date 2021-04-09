import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListCarComponent } from './pages/cars/list/list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cars',
    component: ListCarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
