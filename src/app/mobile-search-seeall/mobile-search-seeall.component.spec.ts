import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchSeeallComponent } from './mobile-search-seeall.component';

describe('MobileSearchSeeallComponent', () => {
  let component: MobileSearchSeeallComponent;
  let fixture: ComponentFixture<MobileSearchSeeallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSearchSeeallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSearchSeeallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
