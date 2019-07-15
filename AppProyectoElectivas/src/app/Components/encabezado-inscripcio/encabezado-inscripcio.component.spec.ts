import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoInscripcioComponent } from './encabezado-inscripcio.component';

describe('EncabezadoInscripcioComponent', () => {
  let component: EncabezadoInscripcioComponent;
  let fixture: ComponentFixture<EncabezadoInscripcioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncabezadoInscripcioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoInscripcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
