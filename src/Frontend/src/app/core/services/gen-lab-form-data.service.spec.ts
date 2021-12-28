import { TestBed } from '@angular/core/testing';

import { GenLabFormDataService } from './gen-lab-form-data.service';

describe('GenLabFormDataService', () => {
  let service: GenLabFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenLabFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
