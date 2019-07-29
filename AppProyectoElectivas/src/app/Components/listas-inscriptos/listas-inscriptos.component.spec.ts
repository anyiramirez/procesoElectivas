import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasInscriptosComponent } from './listas-inscriptos.component';

describe('ListasInscriptosComponent', () => {
  let component: ListasInscriptosComponent;
  let fixture: ComponentFixture<ListasInscriptosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasInscriptosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasInscriptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
