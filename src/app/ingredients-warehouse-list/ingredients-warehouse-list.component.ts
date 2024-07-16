import {Component, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {AnimationOptions} from "ngx-lottie";
import {ApiService} from "../../services/api.service";
import {IngredientWarehouseModel} from "../../models/ingredient-warehouse.model";

@Component({
  selector: 'app-ingredients-warehouse-list',
  templateUrl: './ingredients-warehouse-list.component.html',
  styleUrl: './ingredients-warehouse-list.component.scss'
})
export class IngredientsWarehouseListComponent implements OnInit {
  // Row Data: The data to be displayed.
  rowData: IngredientWarehouseModel[] = [];
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      headerName: '#',
      field: "id",
      maxWidth: 100
    },
    {
      headerName: 'Ingrediente',
      field: "name",
    }, {
      headerName: 'Total disponible',
      field: "total_available",
    },
  ];
  options: AnimationOptions = {
    path: '/loading.json',
  };
  isLoading = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients() {
    this.isLoading = true;
    this.apiService.getAvailableIngredientsFromWarehouse(undefined, 'desc', undefined).subscribe({
      next: data => {
        this.isLoading = false;
        this.rowData = data;
      }
    })
  }

}
