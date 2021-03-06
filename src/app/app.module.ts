import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PriceBaseUrl, RigBaseUrl, SocketEndpoint } from './services/tokens';
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
import { SummaryTablesComponent } from './components/dashboard/summary-tables/summary-tables.component';
import { MatTableModule } from '@angular/material/table';
import { TemperatureChartComponent } from './components/dashboard/charts/temperature-chart/temperature-chart.component';
import { MiningHistoryChartComponent } from './components/dashboard/charts/mining-history-chart/mining-history-chart.component';

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
    SummaryTablesComponent,
    TemperatureChartComponent,
    MiningHistoryChartComponent
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
    },
    {
      provide: PriceBaseUrl,
      useValue: `${environment.apiConfig.protocol}://${environment.apiConfig.domain}${(environment.apiConfig.port != null ? ':' + environment.apiConfig.port : '')}/${environment.apiConfig.priceBaseUrl}`
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
