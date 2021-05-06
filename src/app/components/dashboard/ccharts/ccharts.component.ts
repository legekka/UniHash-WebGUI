import { Component, OnInit } from '@angular/core';
import { StackedAreaChart } from '@carbon/charts';
import { ChartData, LineChartOptions, ScaleTypes, StackedAreaChartOptions } from '@carbon/charts/interfaces';
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

  public mhOptions: StackedAreaChartOptions = {
    title: "Mining History",
    axes: {
      bottom: {
        title: "Time",
        mapsTo: "date",
        scaleType: ScaleTypes.TIME
      },
      left: {
        title: "Mined amount (BTC)",
        stacked: true,
        mapsTo: "value",
        scaleType: ScaleTypes.LINEAR
      }
    },
    animations: true,
    points: {
      radius: 0,
      enabled: false
    },
    timeScale: {
      addSpaceOnEdges: 0
    },
    resizable: true,
    width: "100%",
    height: "400px"
  }

  public tempOptions: LineChartOptions = {
    title: "Temperatures",
    axes: {
      bottom: {
        title: "Time",
        mapsTo: "date",
        scaleType: ScaleTypes.TIME
      },
      left: {
        mapsTo: "value",
        title: "Temperature (°C)",
        scaleType: ScaleTypes.LINEAR
      }
    },
    animations: true,
    points: {
      radius: 0,
      enabled: false
    },
    timeScale: {
      addSpaceOnEdges: 0
    },
    resizable: true,
    width: "100%",
    height: "400px"
  };

  public tempData = [];
  public mhData = [];

  constructor(private rigService: RigService) { }

  ngOnInit(): void {
    this.rigService.getRigSnapshots().pipe(
      tap((rigs) => this.addSnapshots(rigs)),
      switchMap(() => this.rigService.getRigSnapshotSource()),
      tap((rigs) => this.addSnapshots(rigs))
    ).subscribe();
  }

  private addSnapshots(rigs: Rig[]): void {
    if (this.tempData.length == 0) {
      rigs.forEach(rig => {
        rig.snapshots.sort((a, b) => (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())).forEach(snapshot => {
          if (snapshot.temperature > 0) {
            this.tempData.push({
              group: rig.name,
              date: new Date(snapshot.timestamp),
              value: snapshot.temperature
            });
          }
        })
      })
    } else {
      rigs.forEach((rig) => {
        if (rig.snapshots[0].temperature > 0) {
          this.tempData.push({
            group: rig.name,
            date: new Date(rig.snapshots[0].timestamp),
            value: rig.snapshots[0].temperature
          })
        }
      })
    }
    this.tempData = [...this.tempData];

    if (this.mhData.length == 0) {
      rigs.forEach(rig => {
        rig.snapshots.sort((a, b) => (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())).forEach(snapshot => {
          this.mhData.push({
            group: rig.name,
            date: new Date(snapshot.timestamp),
            value: snapshot.currentUnpaidAmount
          });
        })
      })
    } else {
      rigs.forEach((rig) => {
        this.mhData.push({
          group: rig.name,
          date: new Date(rig.snapshots[0].timestamp),
          value: rig.snapshots[0].currentUnpaidAmount
        })
      })
    }
    this.mhData = [...this.mhData];
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
