import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientaccountComponent } from './clientaccount.component';

describe('ClientaccountComponent', () => {
  let component: ClientaccountComponent;
  let fixture: ComponentFixture<ClientaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
