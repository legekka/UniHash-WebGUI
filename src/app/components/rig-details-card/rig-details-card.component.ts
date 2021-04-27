import { Component, Input, OnInit } from '@angular/core';
import { MiningAlgorithmDisplayNames } from 'src/app/models/mining-algorithm.enum';
import { Rig } from 'src/app/models/rig';
import { RigSnapshot } from 'src/app/models/rig-snapshot';

@Component({
  selector: 'app-rig-details-card',
  templateUrl: './rig-details-card.component.html',
  styleUrls: ['./rig-details-card.component.scss']
})
export class RigDetailsCardComponent implements OnInit {

  public MiningAlgorithmDisplayNames = MiningAlgorithmDisplayNames;

  @Input()
  rig: Rig;

  constructor() { }

  ngOnInit(): void {
    console.log(this.getLastSnapshot());
    console.log(MiningAlgorithmDisplayNames.get(this.getLastSnapshot().algorithm));
  }

  getLastSnapshot(): RigSnapshot {
    if (this.rig.snapshots == null || this.rig.snapshots.length === 0) {
      return null;
    }
    return this.rig.snapshots[this.rig.snapshots.length - 1];
  }

}
