import { TestBed } from '@angular/core/testing';

import { RegisterExhibitFieldsService } from './register-exhibit-fields.service';

describe('RegisterExhibitFieldsService', () => {
  let service: RegisterExhibitFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterExhibitFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
