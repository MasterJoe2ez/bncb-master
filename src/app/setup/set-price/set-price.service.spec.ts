import { TestBed, inject } from '@angular/core/testing';

import { SetPriceService } from './set-price.service';

describe('SetPriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetPriceService]
    });
  });

  it('should be created', inject([SetPriceService], (service: SetPriceService) => {
    expect(service).toBeTruthy();
  }));
});
