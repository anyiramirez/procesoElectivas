import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarElectivaComponent } from './modal-editar-electiva.component';

describe('ModalEditarElectivaComponent', () => {
  let component: ModalEditarElectivaComponent;
  let fixture: ComponentFixture<ModalEditarElectivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarElectivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarElectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
