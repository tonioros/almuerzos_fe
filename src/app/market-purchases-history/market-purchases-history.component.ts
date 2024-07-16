import {Component, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {AnimationOptions} from "ngx-lottie";
import {ApiService} from "../../services/api.service";
import {MarketPurchaseModel} from "../../models/market-purchase.model";

@Component({
  selector: 'app-market-purchases-history',
  templateUrl: './market-purchases-history.component.html',
  styleUrl: './market-purchases-history.component.scss'
})
export class MarketPurchasesHistoryComponent implements OnInit {
  // Row Data: The data to be displayed.
  rowData: MarketPurchaseModel[] = [];
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      headerName: '#',
      field: "id",
      maxWidth: 100
    },
    {
      headerName: 'Ingrediente',
      valueGetter: params => params.data.ingredient.name,
    }, {
      field: "request_date",
      minWidth: 300,
      valueGetter: params =>
        (new Date(params.data.request_date)
          .toLocaleString('es-MX', {timeZoneName: 'short'})),

      headerName: "Fecha/Hora solicitado",
    }, {
      headerName: 'Total obtenido',
      field: "total_purchased",
    },
  ];
  options: AnimationOptions = {
    path: '/loading.json',
  };
  isLoading = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loadMarketPurchases();
  }

  loadMarketPurchases() {
    this.isLoading = true;
    this.apiService.getMarketPurchaseHistory(undefined, 'desc', true, undefined).subscribe({
      next: data => {
        this.isLoading = false;
        this.rowData = data;
      }
    })
  }
}
