import { TestBed } from '@angular/core/testing';

import { AthletesClientService } from './athletes-client.service';

describe('AthletesClientService', () => {
  let service: AthletesClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthletesClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
