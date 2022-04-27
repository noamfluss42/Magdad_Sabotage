import { TestBed } from '@angular/core/testing';

import { DownloadExhibitsService } from './download-exhibits.service';

describe('DownloadExhibitsService', () => {
  let service: DownloadExhibitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadExhibitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
