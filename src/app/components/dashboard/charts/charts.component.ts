import { Component, Input, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Rig, RigWithHelpers } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';
import { curveBasis } from 'd3-shape';
import { EChartsOption, SeriesModel, SeriesOption } from 'echarts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  private series: SeriesOption[] = [];
  private xAxisData = [];
  // options
  options = {
    title: {
      text: 'Temperature'
    },
    series: this.series,
    xAxis: {
      name: 'Time',
      type: 'time',
      data: this.xAxisData
    },
    yAxis: {
      name: 'Celsius (°C)',
      type: 'value'
    }
  };

  updateOptions: EChartsOption = {
    series: []
  }

  constructor(private rigService: RigService) { }

  ngOnInit(): void {
    this.rigService.getRigSnapshots().pipe(
      tap((rigs) => this.addSnapshots(rigs)),
      switchMap(() => this.rigService.getRigSnapshotSource()),
      tap((rigs) => this.addSnapshots(rigs))
    ).subscribe();
  }

  private addSnapshots(rigs: Rig[]): void {
    if (this.xAxisData.length == 0) {
      rigs.forEach(rig => {
        rig.snapshots.forEach(snapshot => {
          if (!this.xAxisData.includes(snapshot.timestamp))
            this.xAxisData.push(new Date(snapshot.timestamp));
        })
      })
    }
    this.options.xAxis.data = this.xAxisData;
    rigs.forEach(rig => {
      const rigSeries = this.series.find(s => s.name === rig.name);
      if (rigSeries == null) {
        const data = [];
        let s: SeriesOption = {
          name: rig.name,
          data: data,
          type: "line"
        }
        this.xAxisData.forEach(timestamp => {
          const snapshots = rig.snapshots.filter(snapshot => snapshot.timestamp === timestamp);
          data.push(snapshots.length !== 0 ? snapshots[0].temperature > 0 ? snapshots[0].temperature : null : null);
        });
        (this.series as SeriesOption[]).push(s);
      } else {
        const data = rigSeries.data as number[];
        data.push(rig.snapshots[0].temperature > 0 ? rig.snapshots[0].temperature : null);
        data.shift();
        // let update = (this.updateOptions.series as SeriesOption[]).filter(t => t.name == series.name);
        // if (update.length !== 0)
        //   update[0].data = series.data;
      }
    })
    this.options = {...this.options};
  }
}
    //   rigs.forEach((rig) => {
    //     const series = this.data.find((s) => s.name === rig.name);
    //     if (series == null) {
    //       this.data.push({
    //         name: rig.name,
    //         series: rig.snapshots.filter(snapshot => snapshot.temperature > 0).map((snapshot) => ({
    //           name: snapshot.timestamp,
    //           value: snapshot.temperature,
    //         }))
    //       });
    //     } else {
    //       if (rig.snapshots[0].temperature > 0) {
    //         series.series.push({
    //           name: rig.snapshots[0].timestamp,
    //           value: rig.snapshots[0].temperature,
    //         });
    //         series.series.shift();
    //       }
    //     }
    //   });
    //   this.data = [...this.data];
    // }
