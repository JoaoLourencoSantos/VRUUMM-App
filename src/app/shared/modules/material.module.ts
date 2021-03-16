import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const material = [
  MatFormFieldModule,
  MatTabsModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
];
const general = [CommonModule];

@NgModule({
  declarations: [],
  imports: [...general, ...material],
  exports: material,
})
export class MaterialModule {}