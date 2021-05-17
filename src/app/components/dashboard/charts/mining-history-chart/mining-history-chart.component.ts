import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Rig } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';
import { EChartsOption, SeriesOption } from 'echarts';
import { AUTO_STYLE } from '@angular/animations';

@Component({
  selector: 'app-mining-history-chart',
  templateUrl: './mining-history-chart.component.html',
  styleUrls: ['./mining-history-chart.component.scss']
})
export class MiningHistoryChartComponent implements OnInit {
  private series: SeriesOption[] = [];
  // options
  options: EChartsOption = {
    backgroundColor: 'rgba(0,0,0,0)',
    title: {
      text: 'Mining History'
    },
    legend: {
      align: "auto",
      bottom: 1
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      show: true,
    },
    series: this.series,
    xAxis: {
      name: 'Time',
      type: 'time',
      // axisLabel: {
      //   formatter: t => {
      //     let date = new Date(t);
      //     return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      //   }
      // }
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      },
    },
    yAxis: {
      name: 'Amount (BTC)',
      type: 'value',
      scale: true,
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      },
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
    let from = new Date(Date.now() - 1000 * 60 * 60 * 9);
    this.rigService.getRigSnapshots().pipe(
      tap((rigs) => this.addSnapshots(rigs)),
      switchMap(() => this.rigService.getRigSnapshotSource()),
      tap((rigs) => this.addSnapshots(rigs))
    ).subscribe();
  }

  private addSnapshots(rigs: Rig[]): void {
    rigs.forEach(rig => {
      const rigSeries = this.series.find(s => s.name === rig.name);
      if (rigSeries == null) {
        const data = [];
        let s = {
          name: rig.name,
          data: data,
          type: "line",
          stack: "counts",
          showSymbol: false,

        }
        s["areaStyle"] = { normal: {} };
        rig.snapshots.forEach(snapshot => {
          data.push([
            snapshot.timestamp,
            snapshot.currentUnpaidAmount
          ])
        });
        (this.series as any[]).push(s);
      } else {
        const data = rigSeries.data as any[];
        data.push([rig.snapshots[0].timestamp, rig.snapshots[0].currentUnpaidAmount]);
        data.shift();
      }
    })
    this.options = { ...this.options };
  }

}
