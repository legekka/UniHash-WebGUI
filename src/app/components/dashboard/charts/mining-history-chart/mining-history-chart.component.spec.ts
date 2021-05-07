import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningHistoryChartComponent } from './mining-history-chart.component';

describe('MiningHistoryChartComponent', () => {
  let component: MiningHistoryChartComponent;
  let fixture: ComponentFixture<MiningHistoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningHistoryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningHistoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
