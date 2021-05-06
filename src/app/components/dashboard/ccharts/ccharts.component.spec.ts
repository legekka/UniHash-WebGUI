import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CchartsComponent } from './ccharts.component';

describe('CchartsComponent', () => {
  let component: CchartsComponent;
  let fixture: ComponentFixture<CchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
