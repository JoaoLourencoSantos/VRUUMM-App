import { NgxCurrencyModule } from 'ngx-currency';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './modules/pages/main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, NgxCurrencyModule],
  bootstrap: [MainComponent],
})
export class MainModule {}
