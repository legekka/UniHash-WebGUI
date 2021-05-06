import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Rig } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';
import "./ibm-plex-font.css";

@Component({
  selector: 'app-ccharts',
  templateUrl: './ccharts.component.html',
  styleUrls: ['./ccharts.component.scss']
})
export class CchartsComponent implements OnInit {

  public options = {
    title: "Temperatures",
    axes: {
      bottom: {
        title: "Time",
        mapsTo: "date",
        scaleType: "time"
      },
      left: {
        mapsTo: "value",
        title: "Temperature (°C)",
        scaleType: "linear"
      }
    },
    curve: "curveMonotoneX",
    height: "400px"
  };

  public data = [];

  constructor(private rigService: RigService) { }

  ngOnInit(): void {
    this.rigService.getRigSnapshots().pipe(
      tap((rigs) => this.addSnapshots(rigs)),
      switchMap(() => this.rigService.getRigSnapshotSource()),
      tap((rigs) => this.addSnapshots(rigs))
    ).subscribe();
  }

  private addSnapshots(rigs: Rig[]): void {



    rigs.forEach((rig) => {
      this.data.push({
        group: rig.name,
        date: rig.snapshots[0].timestamp,
        value: rig.snapshots[0].temperature
      })
    })
    //console.log(this.data);
    
    
    this.data = [...this.data];

    // rigs.forEach((rig) => {
    //   if (this.data.filter(t => t.group == rig.name).length == 0) {
    //     this.data = this.data.concat(this.data, rig.snapshots.filter(snapshot => snapshot.temperature > 0).map((snapshot) => ({
    //       group: rig.name,
    //       date: snapshot.timestamp,
    //       value: snapshot.temperature
    //     })));
    //   } else {
    //     if (rig.snapshots[0].temperature > 0) {
    //       this.data.push({
    //         group: rig.name,
    //         date: rig.snapshots[0].timestamp,
    //         value: rig.snapshots[0].temperature
    //       })
    //       this.data.shift();
    //     }
    //   }
    // });
    
  }


}
