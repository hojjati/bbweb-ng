import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipsAdminComponent } from './memberships-admin.component';

describe('MembershipsAdminComponent', () => {
  let component: MembershipsAdminComponent;
  let fixture: ComponentFixture<MembershipsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
