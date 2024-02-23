import { TestBed } from '@angular/core/testing';

import { AttendanceManipulationService } from './attendance-manipulation.service';

describe('AttendanceManipulationService', () => {
  let service: AttendanceManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
