import { TestBed } from '@angular/core/testing';

import { RegistroDatosService } from './registro-datos.service';

describe('RegistroDatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroDatosService = TestBed.get(RegistroDatosService);
    expect(service).toBeTruthy();
  });
});
