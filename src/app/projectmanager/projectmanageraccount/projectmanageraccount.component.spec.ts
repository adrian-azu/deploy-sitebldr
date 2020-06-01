import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmanageraccountComponent } from './projectmanageraccount.component';

describe('ProjectmanageraccountComponent', () => {
  let component: ProjectmanageraccountComponent;
  let fixture: ComponentFixture<ProjectmanageraccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectmanageraccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectmanageraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
