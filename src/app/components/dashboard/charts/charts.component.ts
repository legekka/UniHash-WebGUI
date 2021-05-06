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
  options: EChartsOption = {
    title: {
      text: 'Temperature'
    },
    legend: {
      //data: ['bar', 'bar2'],
      align: 'left',
    },
    tooltip: {
      trigger: 'axis'
    },
    series: this.series,
    xAxis: {
      name: 'Time',
      type: 'category',
      data: this.xAxisData
    },
    yAxis: {
      name: 'Celsius (°C)',
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: t => {
          return t + "°C"
        }
      }
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
            this.xAxisData.push(snapshot.timestamp);
        })
      })
    }
    this.options.xAxis['data'] = this.xAxisData;
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
        if (this.xAxisData[this.xAxisData.length - 1] !== rig.snapshots[0].timestamp) {
          this.xAxisData.push(rig.snapshots[0].timestamp);
          this.xAxisData.shift();
        }
      }
    })
    this.options = { ...this.options };
  }
}