import { TestBed } from '@angular/core/testing';

import { SearchCaseService } from './search-case.service';

describe('SearchCaseService', () => {
  let service: SearchCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
