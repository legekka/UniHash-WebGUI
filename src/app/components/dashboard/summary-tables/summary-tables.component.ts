import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RigWithHelpers } from 'src/app/models/rig';

@Component({
  selector: 'app-summary-tables',
  templateUrl: './summary-tables.component.html',
  styleUrls: ['./summary-tables.component.scss']
})
export class SummaryTablesComponent implements OnInit {

  @Input()
  set rigs(value) {
    this._rigs = value;
    if (value != null) {
      this.refreshSummaryTables();
    }
  }
  get rigs() {
    return this._rigs;
  }
  _rigs: RigWithHelpers[];

  displayedColumns: string[] = ['name', 'percentage', 'amount'];
  // Current unpaid amount table values
  currentTableElements: TableElement[] = [];
  totalTableElements: TableElement[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  private refreshSummaryTables(): void {
    this.currentTableElements = [];
    this._rigs.forEach(rig => {
      let element: TableElement = {
        name: rig.name,
        percentage: (rig.latestSnapshot.currentUnpaidAmount / this.rigs.reduce((total, rig) => total += rig.latestSnapshot.currentUnpaidAmount, 0) * 100).toFixed(2) + "%",
        amount: rig.latestSnapshot.currentUnpaidAmount
      };
      this.currentTableElements.push(element);
    });
    let element: TableElement = {
      name: "Total",
      percentage: "",
      amount: this.rigs.reduce((total, rig) => total += rig.latestSnapshot.currentUnpaidAmount, 0)
    }
    this.currentTableElements.push(element);

    this.totalTableElements = [];
    this._rigs.forEach(rig => {
      let element: TableElement = {
        name: rig.name,
        percentage: (rig.latestSnapshot.totalUnpaidAmount / this.rigs.reduce((total, rig) => total += rig.latestSnapshot.totalUnpaidAmount, 0) * 100).toFixed(2) + "%",
        amount: rig.latestSnapshot.totalUnpaidAmount
      };
      this.totalTableElements.push(element);
    });
    element = {
      name: "Total",
      percentage: "",
      amount: this.rigs.reduce((total, rig) => total += rig.latestSnapshot.totalUnpaidAmount, 0)
    }
    this.totalTableElements.push(element);
  }
}

export interface TableElement {
  name: string;
  percentage: string;
  amount: number;
}