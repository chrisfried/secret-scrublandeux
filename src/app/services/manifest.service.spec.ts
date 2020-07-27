import { TestBed } from '@angular/core/testing';

import { ManifestService } from './manifest.service';

describe('ManifestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManifestService = TestBed.get(ManifestService);
    expect(service).toBeTruthy();
  });
});
