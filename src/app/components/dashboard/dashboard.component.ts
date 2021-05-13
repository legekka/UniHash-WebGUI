import { Component, OnInit } from '@angular/core';
import { PriceData } from 'src/app/models/price-data';
import { CreateRigWithHelpers, RigWithHelpers } from 'src/app/models/rig';
import { PriceService } from 'src/app/services/price/price.service';
import { RigService } from 'src/app/services/rig/rig.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rigs: RigWithHelpers[];
  price: PriceData;

  constructor(
    private rigService: RigService,
    private priceService: PriceService
  ) { }

  ngOnInit(): void {
    this.rigService.getRigSnapshotsCombined().subscribe(rigs => {
      this.rigs = rigs.map(rig => CreateRigWithHelpers(rig));
    });
    this.priceService.getPriceSource().subscribe(priceData => this.price = priceData);
  }
}
