import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { enrolledGuard } from './enrolled.guard';

describe('enrolledGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => enrolledGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
