import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskNavbarComponent } from './desk-navbar.component';

describe('DeskNavbarComponent', () => {
  let component: DeskNavbarComponent;
  let fixture: ComponentFixture<DeskNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
