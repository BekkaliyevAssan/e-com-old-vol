import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelSubcategoriesComponent } from './admin-panel-subcategories.component';

describe('AdminPanelSubcategoriesComponent', () => {
  let component: AdminPanelSubcategoriesComponent;
  let fixture: ComponentFixture<AdminPanelSubcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelSubcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
