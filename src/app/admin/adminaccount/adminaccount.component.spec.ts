import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaccountComponent } from './adminaccount.component';

describe('AdminaccountComponent', () => {
  let component: AdminaccountComponent;
  let fixture: ComponentFixture<AdminaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
