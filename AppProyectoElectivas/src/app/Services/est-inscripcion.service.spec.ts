import { TestBed, inject } from '@angular/core/testing';

import { EstInscripcionService } from './est-inscripcion.service';

describe('EstInscripcionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstInscripcionService]
    });
  });

  it('should be created', inject([EstInscripcionService], (service: EstInscripcionService) => {
    expect(service).toBeTruthy();
  }));
});
