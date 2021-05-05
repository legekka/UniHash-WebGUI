import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTablesComponent } from './summary-tables.component';

describe('SummaryTablesComponent', () => {
  let component: SummaryTablesComponent;
  let fixture: ComponentFixture<SummaryTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
