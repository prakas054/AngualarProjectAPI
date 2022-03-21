import { TestBed } from '@angular/core/testing';

import { SendnotesService } from './sendnotes.service';

describe('SendnotesService', () => {
  let service: SendnotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendnotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
