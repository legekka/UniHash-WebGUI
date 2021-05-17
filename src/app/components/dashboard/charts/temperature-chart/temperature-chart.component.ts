import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Rig } from 'src/app/models/rig';
import { RigService } from 'src/app/services/rig/rig.service';
import { EChartsOption, SeriesOption } from 'echarts';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.scss'],
})
export class TemperatureChartComponent implements OnInit {
  private series: SeriesOption[] = [];

  // options
  options: EChartsOption = {
    backgroundColor: 'rgba(0,0,0,0)',
    title: {
      text: 'Temperature'
    },
    legend: {
      align: "auto",
      bottom: 1
    },
    tooltip: {
      trigger: 'axis'
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
      name: 'Celsius (°C)',
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: t => {
          return t + "°C"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      },
    }
  };

  updateOptions: EChartsOption = {
    series: []
  }

  constructor(private rigService: RigService) { }

  ngOnInit(): void {
    let from = new Date(Date.now() - 1000 * 60 * 60 * 2);
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
        let s: SeriesOption = {
          name: rig.name,
          data: data,
          smooth: true,
          showSymbol: false,
          type: "line",
        }
        rig.snapshots.forEach(snapshot => {
          if (snapshot.temperature > 0)
            data.push([
              snapshot.timestamp,
              snapshot.temperature
            ])
        })
        this.series.push(s);
      } else {
        if (rig.snapshots[0].temperature > 0) {
          const data = rigSeries.data as any[];
          data.push([
            rig.snapshots[0].timestamp,
            rig.snapshots[0].temperature
          ]);
          data.shift();
        }
      }
    })
    this.options = { ...this.options };
  }
}
