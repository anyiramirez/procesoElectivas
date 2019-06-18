import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloofertaComponent } from './modulooferta.component';

describe('ModuloofertaComponent', () => {
  let component: ModuloofertaComponent;
  let fixture: ComponentFixture<ModuloofertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloofertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
