import { TestBed } from '@angular/core/testing';

import { BusinessCardServiceService } from './business-card-service.service';

describe('BusinessCardServiceService', () => {
  let service: BusinessCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
