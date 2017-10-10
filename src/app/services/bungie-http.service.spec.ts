import { TestBed, inject } from '@angular/core/testing';

import { BungieHttpService } from './bungie-http.service';

describe('BungieHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BungieHttpService]
    });
  });

  it('should be created', inject([BungieHttpService], (service: BungieHttpService) => {
    expect(service).toBeTruthy();
  }));
});
