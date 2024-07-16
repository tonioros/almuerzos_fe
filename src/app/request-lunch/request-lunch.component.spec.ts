import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLunchComponent } from './request-lunch.component';

describe('RequestLunchComponent', () => {
  let component: RequestLunchComponent;
  let fixture: ComponentFixture<RequestLunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestLunchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
