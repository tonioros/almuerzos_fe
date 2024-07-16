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

}
