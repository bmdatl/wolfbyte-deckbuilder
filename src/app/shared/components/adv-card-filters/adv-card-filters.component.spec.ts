import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvCardFiltersComponent } from './adv-card-filters.component';

describe('AdvCardFiltersComponent', () => {
  let component: AdvCardFiltersComponent;
  let fixture: ComponentFixture<AdvCardFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvCardFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvCardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
