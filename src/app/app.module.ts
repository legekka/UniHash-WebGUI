import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RigBaseUrl, SocketEndpoint } from './services/tokens';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RigDetailsCardComponent } from './components/rig-details-card/rig-details-card.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    RigDetailsCardComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: SocketEndpoint,
      useValue: `${environment.apiConfig.protocol}://${environment.apiConfig.domain}${(environment.apiConfig.port != null ? ':' + environment.apiConfig.port : '')}`
    },
    {
      provide: RigBaseUrl,
      useValue: `${environment.apiConfig.protocol}://${environment.apiConfig.domain}${(environment.apiConfig.port != null ? ':' + environment.apiConfig.port : '')}/${environment.apiConfig.rigBaseUrl}`
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
