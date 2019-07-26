import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarOfertaComponent } from './modal-agregar-oferta.component';

describe('ModalAgregarOfertaComponent', () => {
  let component: ModalAgregarOfertaComponent;
  let fixture: ComponentFixture<ModalAgregarOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
