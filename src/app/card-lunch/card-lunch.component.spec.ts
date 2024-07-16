import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLunchComponent } from './card-lunch.component';

describe('CardLunchComponent', () => {
  let component: CardLunchComponent;
  let fixture: ComponentFixture<CardLunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardLunchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
