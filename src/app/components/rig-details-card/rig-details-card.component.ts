import { Component, Input, OnInit } from '@angular/core';
import { Rig } from 'src/app/models/rig';

@Component({
  selector: 'app-rig-details-card',
  templateUrl: './rig-details-card.component.html',
  styleUrls: ['./rig-details-card.component.scss']
})
export class RigDetailsCardComponent implements OnInit {

  @Input()
  rig: Rig;

  constructor() { }

  ngOnInit(): void {
  }

}
