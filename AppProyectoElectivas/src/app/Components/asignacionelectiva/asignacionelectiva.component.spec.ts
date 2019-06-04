import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionelectivaComponent } from './asignacionelectiva.component';

describe('AsignacionelectivaComponent', () => {
  let component: AsignacionelectivaComponent;
  let fixture: ComponentFixture<AsignacionelectivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionelectivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionelectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
