import { Component, Input, OnInit } from '@angular/core';
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
  data = [];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Temperature (°C)';
  timeline: boolean = false;
  yAxisTickFormatting = value => `${value} °C`;
  xAxisTickFormatting = value => {
    const date = new Date(value);
    return date.toLocaleTimeString();
  };

  curve: any = curveBasis;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private rigService: RigService) {}

  ngOnInit(): void {
    this.rigService.getRigSnapshots().pipe(
      tap((rigs) => this.addSnapshots(rigs)),
      switchMap(() => this.rigService.getRigSnapshotSource()),
      tap((rigs) => this.addSnapshots(rigs))
    ).subscribe();
  }

  private addSnapshots(rigs: Rig[]): void {
    rigs.forEach((rig) => {
      const series = this.data.find((s) => s.name === rig.name);
      if (series == null) {
        this.data.push({
          name: rig.name,
          series: rig.snapshots.filter(snapshot => snapshot.temperature > 0).map((snapshot) => ({
            name: snapshot.timestamp,
            value: snapshot.temperature,
          }))
        });
      } else {
        if (rig.snapshots[0].temperature > 0) {
          series.series.push({
            name: rig.snapshots[0].timestamp,
            value: rig.snapshots[0].temperature,
          });
          series.series.shift();
        }
      }
    });
    this.data = [...this.data];
  }
}
