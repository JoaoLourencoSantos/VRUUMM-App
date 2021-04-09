import { LoginComponent } from './page/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
  providers: [LoginService],
})
export class LoginModule {}
