import { TestBed } from '@angular/core/testing';

import { PatientVisitDetailService } from './patient-visit-detail.service';

describe('PatientVisitDetailService', () => {
  let service: PatientVisitDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientVisitDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
