import { Component, Input, OnInit } from '@angular/core';
import { MiningAlgorithm } from 'src/app/models/mining-algorithm.enum';
import { RigWithHelpers } from 'src/app/models/rig';
import { MiningAlgorithmDisplayNames } from 'src/app/models/mining-algorithm.enum';
import { PriceData } from 'src/app/models/price-data';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public MiningAlgorithmDisplayNames = MiningAlgorithmDisplayNames;

  @Input()
  set rigs(value) {
    this._rigs = value;
    if (value != null) {
      this.refreshSummary();
    }
  }
  get rigs() {
    return this._rigs;
  }
  _rigs: RigWithHelpers[];

  @Input()
  price: PriceData;

  // Template helpers
  totalProfitability: number;
  totalHashrateByAlgorithm: Map<MiningAlgorithm, { speed: number; displaySuffix: string }> = new Map();
  usedAlgorithms: MiningAlgorithm[] = [];
  totalPowerUsage: number;
  totalUnpaidAmount: number;

  constructor() { }

  ngOnInit(): void {
  }

  // Initializers

  private refreshSummary(): void {
    this.totalProfitability = this.rigs.reduce((total, rig) => total += rig.latestSnapshot.profitability, 0);
    this.totalPowerUsage = this.rigs.reduce((total, rig) => total += rig.latestSnapshot.powerUsage, 0);
    this.totalUnpaidAmount = this.rigs.reduce((total, rig) => total += rig.latestSnapshot.totalUnpaidAmount, 0);
    this.totalHashrateByAlgorithm = this.rigs.reduce((map, rig) => {
      if (rig.latestSnapshot.algorithm == null) {
        return map;
      }
      if (!map.has(rig.latestSnapshot.algorithm)) {
        map.set(rig.latestSnapshot.algorithm, { speed: 0, displaySuffix: rig.latestSnapshot.displaySuffix });
        this.usedAlgorithms.push(rig.latestSnapshot.algorithm);
      }
      const value = map.get(rig.latestSnapshot.algorithm);
      value.speed += parseFloat(`${rig.latestSnapshot.speed}`);
      map.set(rig.latestSnapshot.algorithm, value);
      return map;
    }, this.totalHashrateByAlgorithm);
  }
}
