import { TestBed, async, inject } from '@angular/core/testing';

import { PermisorolGuard } from './permisorol.guard';

describe('PermisorolGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermisorolGuard]
    });
  });

  it('should ...', inject([PermisorolGuard], (guard: PermisorolGuard) => {
    expect(guard).toBeTruthy();
  }));
});
