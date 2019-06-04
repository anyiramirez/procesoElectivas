import { TestBed } from '@angular/core/testing';

import { ListaPreinscriptosService } from './lista-preinscriptos.service';

describe('ListaPreinscriptosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaPreinscriptosService = TestBed.get(ListaPreinscriptosService);
    expect(service).toBeTruthy();
  });
});
