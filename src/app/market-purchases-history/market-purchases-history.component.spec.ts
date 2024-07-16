import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPurchasesHistoryComponent } from './market-purchases-history.component';

describe('MarketPurchasesHistoryComponent', () => {
  let component: MarketPurchasesHistoryComponent;
  let fixture: ComponentFixture<MarketPurchasesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketPurchasesHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketPurchasesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
