import { TestBed } from '@angular/core/testing';

import { ListaPreinscritosService } from './lista-preinscritos.service';

describe('ListaPreinscritosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaPreinscritosService = TestBed.get(ListaPreinscritosService);
    expect(service).toBeTruthy();
  });
});
