import { TestBed } from '@angular/core/testing';

import { OpenCaseDataService } from './open-case-data.service';

describe('OpenCaseDataService', () => {
  let service: OpenCaseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenCaseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
