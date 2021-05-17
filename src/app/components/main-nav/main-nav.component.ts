import { Component, OnInit } from '@angular/core';
import { PriceData } from 'src/app/models/price-data';
import { PriceService } from 'src/app/services/price/price.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  price: PriceData;

  constructor(
    private priceService: PriceService
  ) { }

  ngOnInit(): void {
    this.priceService.getPriceSource().subscribe(priceData => this.price = priceData);
  }

}
