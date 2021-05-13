import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { PriceData } from 'src/app/models/price-data';
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

  @Input()
  price: PriceData;

  displayedColumns: string[] = ['name', 'percentage', 'amount', 'value'];
  // Current unpaid amount table values
  currentTableElements: TableElement[] = [];
  totalTableElements: TableElement[] = [];

  currentTableFooter: TableElement;
  totalTableFooter: TableElement;

  constructor() { }

  ngOnInit(): void {
  }


  private refreshSummaryTables(): void {
    this.currentTableElements = [];
    this._rigs.forEach(rig => {
      let value = rig.latestSnapshot.currentUnpaidAmount * this.price.value * 0.995;
      let element: TableElement = {
        name: rig.name,
        percentage: (rig.latestSnapshot.currentUnpaidAmount / this.rigs.reduce((total, rig) => total += rig.latestSnapshot.currentUnpaidAmount, 0) * 100).toFixed(2) + "%",
        amount: rig.latestSnapshot.currentUnpaidAmount,
        value: value
      };
      this.currentTableElements.push(element);
    });

    let amount = this.rigs.reduce((total, rig) => total += rig.latestSnapshot.currentUnpaidAmount, 0)

    let element: TableElement = {
      name: "Total",
      percentage: "",
      amount: amount,
      value: amount * this.price.value * 0.995
    }
    this.currentTableFooter = element;

    this.totalTableElements = [];
    this._rigs.forEach(rig => {
      let value = rig.latestSnapshot.totalUnpaidAmount * this.price.value * 0.995;
      let element: TableElement = {
        name: rig.name,
        percentage: (rig.latestSnapshot.totalUnpaidAmount / this.rigs.reduce((total, rig) => total += rig.latestSnapshot.totalUnpaidAmount, 0) * 100).toFixed(2) + "%",
        amount: rig.latestSnapshot.totalUnpaidAmount,
        value: value
      };
      this.totalTableElements.push(element);
    });

    amount =  this.rigs.reduce((total, rig) => total += rig.latestSnapshot.totalUnpaidAmount, 0); 
    element = {
      name: "Total",
      percentage: "",
      amount: amount,
      value: amount * this.price.value * 0.995
    }
    this.totalTableFooter = element;
  }
}

export interface TableElement {
  name: string;
  percentage: string;
  amount: number;
  value: number;
}