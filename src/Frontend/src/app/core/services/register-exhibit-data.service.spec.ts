import { TestBed } from '@angular/core/testing';

import { RegisterExhibitDataService } from './register-exhibit-data.service';

describe('RegisterExhibitDataService', () => {
  let service: RegisterExhibitDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterExhibitDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
