import { TestBed } from '@angular/core/testing';

import { GenerateDocxService } from './generate-docx.service';

describe('GenerateDocxService', () => {
  let service: GenerateDocxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateDocxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
