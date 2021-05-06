import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RigBaseUrl, SocketEndpoint } from './services/tokens';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RigDetailsCardComponent } from './components/dashboard/rig-details-card/rig-details-card.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MaterialModule } from './modules/material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HashratePipe } from './pipes/hashrate/hashrate.pipe';
import { ProfitabilityPipe } from './pipes/profitability/profitability.pipe';
import { WattagePipe } from './pipes/wattage/wattage.pipe';
import { TemperaturePipe } from './pipes/temperature/temperature.pipe';
import { SummaryComponent } from './components/dashboard/summary/summary.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartsComponent } from './components/dashboard/charts/charts.component';
import { SummaryTablesComponent } from './components/dashboard/summary-tables/summary-tables.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    RigDetailsCardComponent,
    MainNavComponent,
    DashboardComponent,
    HashratePipe,
    ProfitabilityPipe,
    WattagePipe,
    TemperaturePipe,
    SummaryComponent,
    ChartsComponent,
    SummaryTablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatTableModule
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
