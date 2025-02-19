import { TestBed } from '@angular/core/testing';

import { CountriesClientService } from './countries-client.service';

describe('CountriesClientService', () => {
  let service: CountriesClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
