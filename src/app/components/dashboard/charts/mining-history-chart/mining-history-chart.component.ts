import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Rig } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';
import { EChartsOption, SeriesOption } from 'echarts';

@Component({
  selector: 'app-mining-history-chart',
  templateUrl: './mining-history-chart.component.html',
  styleUrls: ['./mining-history-chart.component.scss']
})
export class MiningHistoryChartComponent implements OnInit {
  private series: SeriesOption[] = [];
  private xAxisData = [];
  // options
  options: EChartsOption = {
    title: {
      text: 'Mining History'
    },
    legend: {
      //data: ['bar', 'bar2'],
      align: "auto",
      bottom: 1
    },
    tooltip: {
      trigger: 'axis'
    },
    series: this.series,
    xAxis: {
      name: 'Time',
      type: 'category',
      data: this.xAxisData,
      axisLabel: {
        formatter: t => {
          let date = new Date(t);
          return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
      }
    },
    yAxis: {
      name: 'Amount (BTC)',
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: t => {
          return parseFloat(t).toFixed(8) + " BTC"
        }
      }
    }
  };

  updateOptions: EChartsOption = {
    series: []
  }

  constructor(private rigService: RigService) { }

  ngOnInit(): void {
    let from = new Date(new Date().getTime() - 1000 * 60 * 60 * 12);
    this.rigService.getRigSnapshots(from).pipe(
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
        let s = {
          name: rig.name,
          data: data,
          type: "line",
          stack: "counts"
        }
        s["areaStyle"] = { normal: {} };
        this.xAxisData.forEach(timestamp => {
          const snapshots = rig.snapshots.filter(snapshot => snapshot.timestamp === timestamp);
          data.push(snapshots.length !== 0 ? snapshots[0].currentUnpaidAmount : null);
        });
        (this.series as any[]).push(s);
      } else {
        const data = rigSeries.data as number[];
        data.push(rig.snapshots[0].currentUnpaidAmount);
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
