import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {OrderModel} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private ALMUERZO_API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.ALMUERZO_API_URL = environment.ALMUERZOS_API_URL;
  }

  public requestANewOrder(requestDateTime: string, fcmToken: string) {
    return this.httpClient.post<OrderModel>(`${this.ALMUERZO_API_URL}/order`, {
      fcm_token: fcmToken,
      request_date: requestDateTime
    });
  }

  public getOrders(
    status?: string,
    fcm_token?: string,
    orderBy?: string,
    limit?: number,
    withRecipe?: boolean,
  ) {
    let url = `order?`
    url += (status && status != "") ? `status=${status}&` : "";
    url += (fcm_token && fcm_token != "") ? `fcm_token=${fcm_token}&` : "";
    url += (orderBy && orderBy != "") ? `orderBy=${orderBy}&` : "";
    url += (limit) ? `limit=${limit}` : "";
    url += (withRecipe) ? `withRecipe=${withRecipe}` : "";
    return this.httpClient.get<OrderModel[]>(`${this.ALMUERZO_API_URL}/${url}}`);
  }

}
