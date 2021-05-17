import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  exports: [
    MatSidenavModule,
    MatCardModule,
    MatIconModule
  ],
})
export class MaterialModule {}
