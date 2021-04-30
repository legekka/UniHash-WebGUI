import { Component, Input, OnInit } from '@angular/core';
import { MiningAlgorithmDisplayNames } from 'src/app/models/mining-algorithm.enum';
import { RigWithLatestSnapshot } from 'src/app/models/rig';

@Component({
  selector: 'app-rig-details-card',
  templateUrl: './rig-details-card.component.html',
  styleUrls: ['./rig-details-card.component.scss']
})
export class RigDetailsCardComponent implements OnInit {

  public MiningAlgorithmDisplayNames = MiningAlgorithmDisplayNames;

  @Input()
  rig: RigWithLatestSnapshot;

  constructor() { }

  ngOnInit(): void {

  }

}
