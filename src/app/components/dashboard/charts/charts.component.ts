import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Rig, RigWithHelpers } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';
import { curveBasis } from 'd3-shape';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  columns = ["Time"];

  data = [];

  title = 'Temperature data';
  type = 'LineChart';
  options = {
    hAxis: {
      title: 'Time',
      textStyle: { color: '#FFF' }
    },
    vAxis: {
      title: 'Temperature',
      textStyle: { color: '#FFF' }
    },
    curveType: 'function',
    legend: {
      position: 'bottom',
      textStyle: { color: '#FFF' }
    },
    backgroundColor: { fill: 'transparent' },
    width: 900,
    height: 400
  };


  constructor(private rigService: RigService) { }

  ngOnInit(): void {
    this.rigService.getRigSnapshots().pipe(
      tap((rigs) => this.addSnapshots(rigs)),
      switchMap(() => this.rigService.getRigSnapshotSource()),
      tap((rigs) => this.addSnapshots(rigs))
    ).subscribe();
  }

  private addSnapshots(rigs: Rig[]): void {
    let row = [];
    if (this.data.length == 0) {
      rigs.forEach((rig) => {
        this.columns.push(rig.name);
      })
      rigs[0].snapshots.forEach(snapshot => {
        row = [snapshot.timestamp];
        rigs.forEach(rig => {
          let sn = rig.snapshots.find(t => t.timestamp == row[0]);
          row.push(sn.temperature);
        });
        this.data.push(row);
      })
    } else {
      row = [rigs[0].snapshots[0].timestamp];
      rigs.forEach(rig => {
        let sn = rig.snapshots.find(t => t.timestamp == row[0]);
        row.push(sn.temperature);
      });
      this.data.push(row);
    }
    
    this.data = [...this.data];
    // rigs.forEach((rig) => {
    //   const series = this.data.find((s) => s.name === rig.name);
    //   if (series == null) {
    //     this.data.push({
    //       name: rig.name,
    //       series: rig.snapshots.filter(snapshot => snapshot.temperature > 0).map((snapshot) => ({
    //         name: snapshot.timestamp,
    //         value: snapshot.temperature,
    //       }))
    //     });
    //   } else {
    //     if (rig.snapshots[0].temperature > 0) {
    //       series.series.push({
    //         name: rig.snapshots[0].timestamp,
    //         value: rig.snapshots[0].temperature,
    //       });
    //       series.series.shift();
    //     }
    //   }
    // });
    // this.data = [...this.data];
  }
}
