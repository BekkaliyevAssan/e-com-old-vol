import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelOrdersComponent } from './admin-panel-orders.component';

describe('AdminPanelOrdersComponent', () => {
  let component: AdminPanelOrdersComponent;
  let fixture: ComponentFixture<AdminPanelOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
