import { TestBed } from '@angular/core/testing';

import { SmartPictureService } from './smart-picture.service';

describe('SmartPictureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmartPictureService = TestBed.inject(SmartPictureService);
    expect(service).toBeTruthy();
  });
});
