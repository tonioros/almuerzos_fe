import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {ApiService} from "../../services/api.service";
import {OrderModel} from "../../models/order.model";
import {OrderStatus} from "../../constants/order-status";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-orders-list', templateUrl: './orders-list.component.html', styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent implements OnInit {
  // Row Data: The data to be displayed.
  rowData: OrderModel[] = [];
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      headerName: '#',
      field: "id",
      maxWidth: 100
    },
    {
      headerName: 'Platillo',
      valueGetter: params => params.data.recipe.name,
    },
    {
      field: "status",
      valueGetter: params => this.getOrderStatus(params.data.status).text,
      headerName: 'Estatus',
      cellClass: params => this.getOrderStatus(params.data.status).bgClass,
    },
    {
      field: "Tiempo aprox prep",
      valueGetter: params => params.data.recipe.avg_preparation_time + "segs"
    },
    {
      field: "request_date",
      valueGetter: params =>
        (new Date(params.data.request_date + "+00:00")
          .toLocaleString('es-MX', {timeZoneName: 'short'})),

      headerName: "Fecha/Hora solicitado",
    },
    {
      field: "delivery_date",
      valueGetter: params =>
        (new Date(params.data.delivery_date + "+00:00")
          .toLocaleString('es-MX', {timeZoneName: 'short'})),

      headerName: "Fecha/Hora entrega",
    }
  ];
  filters = {
    status: "",
    fcm_token: "",
    orderBy: "desc",
    withRecipe: false,
  }
  options: AnimationOptions = {
    path: '/loading.json',
  };
  isLoading = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  getOrderStatus(status: string) {
    return OrderStatus[status];
  }

  statusFilterChange({value}: MatButtonToggleChange) {
    this.filters.status = value;
    this.loadOrders();
  }

  private loadOrders() {
    this.isLoading = true;
    this.filters.fcm_token = localStorage.getItem("fcmToken") as string;
    this.filters.withRecipe = true;
    this.apiService.getOrders(
      this.filters.status,
      this.filters.fcm_token,
      this.filters.orderBy,
      undefined,
      this.filters.withRecipe,
    ).subscribe({
      next: data => {
        this.rowData = data;
      },
      complete: () => this.isLoading = false,
    })
  }
}
