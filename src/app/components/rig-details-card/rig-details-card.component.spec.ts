import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigDetailsCardComponent } from './rig-details-card.component';

describe('RigDetailsCardComponent', () => {
  let component: RigDetailsCardComponent;
  let fixture: ComponentFixture<RigDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RigDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RigDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
