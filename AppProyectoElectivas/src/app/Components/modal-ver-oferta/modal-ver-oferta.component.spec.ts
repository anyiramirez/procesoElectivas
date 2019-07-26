import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerOfertaComponent } from './modal-ver-oferta.component';

describe('ModalVerOfertaComponent', () => {
  let component: ModalVerOfertaComponent;
  let fixture: ComponentFixture<ModalVerOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVerOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
