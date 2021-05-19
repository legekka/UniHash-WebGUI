import { Component, OnInit } from '@angular/core';
import { PriceData } from 'src/app/models/price-data';
import { PlatformService } from 'src/app/services/platform/platform.service';
import { PriceService } from 'src/app/services/price/price.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isDesktop: boolean;

  price: PriceData;

  constructor(
    private priceService: PriceService,
    private platformService: PlatformService
  ) { }

  ngOnInit(): void {
    this.priceService.getPriceSource().subscribe(priceData => this.price = priceData);
    this.isDesktop = this.platformService.isDesktop();
  }

}
