import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsWarehouseListComponent } from './ingredients-warehouse-list.component';

describe('IngredientsWarehouseListComponent', () => {
  let component: IngredientsWarehouseListComponent;
  let fixture: ComponentFixture<IngredientsWarehouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientsWarehouseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsWarehouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
