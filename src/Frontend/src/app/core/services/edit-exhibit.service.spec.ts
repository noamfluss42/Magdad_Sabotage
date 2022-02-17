import { TestBed } from '@angular/core/testing';

import { EditExhibitService } from './edit-exhibit.service';

describe('EditExhibitService', () => {
  let service: EditExhibitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditExhibitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
