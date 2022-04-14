import { TestBed } from '@angular/core/testing';

import { CaseResultsService } from './case-results.service';

describe('CaseResultsService', () => {
  let service: CaseResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
