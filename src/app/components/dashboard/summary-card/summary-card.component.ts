import { Component, Input, OnInit } from '@angular/core';
import { Rig } from 'src/app/models/rig';
import { RigSnapshot } from 'src/app/models/rig-snapshot';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {

  @Input()
  rigs: Rig[]

  totalHashrate: number;
  totalProfitability: number;
  totalPower: number;

  constructor() { }

  ngOnInit(): void {

  }

  
}
