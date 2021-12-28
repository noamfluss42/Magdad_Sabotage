import { TestBed } from '@angular/core/testing';

import { GenLabFormFieldsService } from './gen-lab-form-fields.service';

describe('GenLabFormFieldsService', () => {
  let service: GenLabFormFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenLabFormFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
