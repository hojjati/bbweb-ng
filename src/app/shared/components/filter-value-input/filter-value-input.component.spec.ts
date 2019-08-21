import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterValueInputComponent } from './filter-value-input.component';

describe('FilterValueInputComponent', () => {
  let component: FilterValueInputComponent;
  let fixture: ComponentFixture<FilterValueInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterValueInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterValueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});