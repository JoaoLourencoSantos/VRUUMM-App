import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

const material = [
  MatFormFieldModule,
  MatTabsModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressBarModule,
];
const general = [CommonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...material],
  exports: material,
})
export class MaterialModule {}
