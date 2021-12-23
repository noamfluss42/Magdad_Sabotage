import { TestBed } from '@angular/core/testing';

import { OpenCaseFieldsService } from './open-case-fields.service';

describe('OpenCaseFieldsService', () => {
  let service: OpenCaseFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenCaseFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
