import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckviewComponent } from './deckview.component';

describe('DeckviewComponent', () => {
  let component: DeckviewComponent;
  let fixture: ComponentFixture<DeckviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
