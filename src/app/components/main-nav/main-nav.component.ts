import { Component, OnInit } from '@angular/core';
import { Rig } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  rigs: Rig[];

  constructor(
    private rigService: RigService
  ) { }

  ngOnInit(): void {
    this.rigService.getRigSnapshots().subscribe(rigs => this.rigs = rigs);
  }

}
