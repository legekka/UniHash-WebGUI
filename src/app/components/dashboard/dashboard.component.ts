import { Component, OnInit } from '@angular/core';
import { CreateRigWithLatestSnapshot, RigWithLatestSnapshot } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rigs: RigWithLatestSnapshot[];

  constructor(
    private rigService: RigService
  ) { }

  ngOnInit(): void {
    this.rigService.getRigSnapshotsCombined().subscribe(rigs => {
      this.rigs = rigs.map(rig => CreateRigWithLatestSnapshot(rig));
    });
  }
}
