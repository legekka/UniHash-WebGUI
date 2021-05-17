import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PriceData } from 'src/app/models/price-data';
import { CreateRigWithHelpers, Rig, RigWithHelpers } from 'src/app/models/rig';
import { RigStatus } from 'src/app/models/rig-snapshot';
import { PriceService } from 'src/app/services/price/price.service';
import { RigService } from 'src/app/services/rig/rig.service';

const PriorityByMiningStatus: Map<RigStatus, number> = new Map([
  [ RigStatus.MINING, 0 ],
  [ RigStatus.BENCHMARKING, 1 ],
  [ RigStatus.ERROR, 2 ],
  [ RigStatus.PENDING, 3 ],
  [ RigStatus.TRANSFERRED, 4 ],
  [ RigStatus.STOPPED, 5 ],
  [ RigStatus.DISABLED, 6 ],
  [ RigStatus.OFFLINE, 7 ],
  [ RigStatus.UNKNOWN, 8 ]
]);

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
    this.rigService.getRigSnapshotsCombined().pipe(
      map((rigs: Rig[]) => rigs.map(rig => CreateRigWithHelpers(rig))),
      map(rigs => this.sortRigs(rigs))
    ).subscribe(rigs => {
      this.rigs = rigs;
    });
    this.priceService.getPriceSource().subscribe(priceData => this.price = priceData);
  }

  // Private helpers

  private sortRigs(rigs: RigWithHelpers[]): RigWithHelpers[] {
    return rigs.sort((a, b) =>
      PriorityByMiningStatus.get(a.latestSnapshot.minerStatus) - PriorityByMiningStatus.get(b.latestSnapshot.minerStatus)
      || a.name.localeCompare(b.name)
    );
  }

}
