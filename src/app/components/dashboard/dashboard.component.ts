import { Component, OnInit, Output } from '@angular/core';
import { Rig } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  rigs: Rig[];


  constructor(
    private rigService: RigService
  ) { }

  ngOnInit(): void {
    this.rigService.getRigSnapshotsCombined().subscribe(rigs => this.rigs = rigs);
  }
}
