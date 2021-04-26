import { TestBed } from '@angular/core/testing';

import { RigService } from './rig.service';

describe('RigService', () => {
  let service: RigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
