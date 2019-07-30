import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarOfertaComponent } from './modal-editar-oferta.component';

describe('ModalEditarOfertaComponent', () => {
  let component: ModalEditarOfertaComponent;
  let fixture: ComponentFixture<ModalEditarOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
