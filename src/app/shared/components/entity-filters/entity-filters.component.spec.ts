import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as faker from 'faker';

import { EntityFiltersComponent } from './entity-filters.component';
import { EntityStateInfo, SearchFilters } from '@app/domain';
import { SearchFilter } from '@app/domain/search-filters';
import { Factory } from '@app/test/factory';

describe('EntityFiltersComponent', () => {

  let component: EntityFiltersComponent;
  let fixture: ComponentFixture<EntityFiltersComponent>;
  let factory: Factory;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ EntityFiltersComponent, EntityFiltersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFiltersComponent);
    component = fixture.componentInstance;
    factory = new Factory();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default settings', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not display name filter', () => {
      const input = fixture.debugElement.query(By.css('#name'));
      expect(input).toBeNull();
    });

    it('should not display email filter', () => {
      const input = fixture.debugElement.query(By.css('#email'));
      expect(input).toBeNull();
    });

    it('should not display state filter', () => {
      const select = fixture.debugElement.query(By.css('#state'));
      expect(select).toBeNull();
    });

  });

  it('name filter should be displayed', () => {
    component.useNameFilter = true;
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('#name'));
    expect(input).not.toBeNull();
  });

  it('email filter should be displayed', () => {
    component.useEmailFilter = true;
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('#email'));
    expect(input).not.toBeNull();
  });

  it('state filter should be displayed', () => {
    const stateData: EntityStateInfo[] = [
      { id: 'test', label: 'test'}
    ];
    component.stateData = stateData;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('#state'));
    expect(select).not.toBeNull();
  });

  it('should send a `filters` event when name input changes', fakeAsync(() => {
    const newValue = factory.stringNext();
    let filters: SearchFilters;
    component.filters.subscribe((f: SearchFilter) => filters = f);

    component.useNameFilter = true;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#name')).nativeElement;
    input.value = newValue;

    input.dispatchEvent(new Event('input'));
    tick(500);
    expect(filters.name).toBe(newValue);
  }));

  it('should send a `filters` event when email input changes', fakeAsync(() => {
    const newEmail = faker.internet.email();
    let filters: SearchFilters;
    component.filters.subscribe((f: SearchFilter) => filters = f);

    component.useEmailFilter = true;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#email')).nativeElement;
    input.value = newEmail;

    input.dispatchEvent(new Event('input'));
    tick(500);
    expect(filters.email).toBe(newEmail);
  }));

  it('should send a `filters` event when state selection changes', fakeAsync(() => {
    let filters: SearchFilters;
    component.filters.subscribe((f: SearchFilter) => filters = f);

    const stateData: EntityStateInfo[] = [
      { id: 'test', label: 'test'}
    ];
    component.stateData = stateData;
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('#state')).nativeElement;
    select.value = stateData[0].id;

    select.dispatchEvent(new Event('change'));
    tick(500);
    expect(filters.stateId).toBe(stateData[0].id);
  }));

  it('should send a `filters` event when the filters are cleared', fakeAsync(() => {
    let filters: SearchFilters;
    component.filters.subscribe((f: SearchFilter) => filters = f);

    const stateData: EntityStateInfo[] = [
      { id: 'test', label: 'test'}
    ];

    component.useNameFilter = true;
    component.useEmailFilter = true;
    component.stateData = stateData;
    fixture.detectChanges();

    const elements = {
      name: fixture.debugElement.query(By.css('#name')).nativeElement,
      email: fixture.debugElement.query(By.css('#email')).nativeElement,
      state: fixture.debugElement.query(By.css('#state')).nativeElement,
      clearButton: fixture.debugElement.query(By.css('.btn')).nativeElement
    };

    elements.name.value = factory.stringNext();
    elements.email.value = faker.internet.email();
    elements.state.value = stateData[0].id;

    elements.name.dispatchEvent(new Event('input'));
    elements.email.dispatchEvent(new Event('input'));
    elements.state.dispatchEvent(new Event('change'));

    tick(500);
    expect(filters.name).not.toBe('');
    expect(filters.email).not.toBe('');
    expect(filters.stateId).toBe(stateData[0].id);

    elements.clearButton.dispatchEvent(new Event('click'));
    tick(500);
    expect(filters.name).toBe('');
    expect(filters.email).toBe('');
    expect(filters.stateId).toBe('all');
  }));

});