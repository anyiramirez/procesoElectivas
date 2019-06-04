import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasasignacionComponent } from './listasasignacion.component';

describe('ListasasignacionComponent', () => {
  let component: ListasasignacionComponent;
  let fixture: ComponentFixture<ListasasignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasasignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
