import { TestBed } from '@angular/core/testing';

import { AdminServiceClassService } from './admin-service-class.service';

describe('AdminServiceClassService', () => {
  let service: AdminServiceClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminServiceClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
