import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'; 


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
@NgModule({
  exports: [
    MatProgressBarModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
})
export class MaterialUiModule {}
