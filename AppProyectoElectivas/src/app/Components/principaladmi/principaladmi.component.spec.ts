import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaladmiComponent } from './principaladmi.component';

describe('PrincipaladmiComponent', () => {
  let component: PrincipaladmiComponent;
  let fixture: ComponentFixture<PrincipaladmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipaladmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipaladmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
