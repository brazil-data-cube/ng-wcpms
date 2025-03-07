import { TestBed } from '@angular/core/testing';

import { NgWcpmsService } from './ng-wcpms.service';

describe('NgWcpmsService', () => {
  let service: NgWcpmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgWcpmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
