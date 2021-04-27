import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatSidenavModule,
    MatCardModule
  ],
})
export class MaterialModule {}
