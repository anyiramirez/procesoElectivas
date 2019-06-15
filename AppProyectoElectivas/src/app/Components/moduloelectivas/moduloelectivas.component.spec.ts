import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloelectivasComponent } from './moduloelectivas.component';

describe('ModuloelectivasComponent', () => {
  let component: ModuloelectivasComponent;
  let fixture: ComponentFixture<ModuloelectivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloelectivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloelectivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
