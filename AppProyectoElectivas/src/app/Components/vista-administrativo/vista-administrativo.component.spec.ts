import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdministrativoComponent } from './vista-administrativo.component';

describe('VistaAdministrativoComponent', () => {
  let component: VistaAdministrativoComponent;
  let fixture: ComponentFixture<VistaAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
