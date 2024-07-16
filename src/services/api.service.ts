import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {OrderModel} from "../models/order.model";
import {IngredientWarehouseModel} from "../models/ingredient-warehouse.model";
import {MarketPurchaseModel} from "../models/market-purchase.model";
import {RecipeModel} from "../models/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private ALMUERZO_API_URL: string;
  private BODEGA_API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.ALMUERZO_API_URL = environment.ALMUERZOS_API_URL;
    this.BODEGA_API_URL = environment.BODEGA_API_URL;
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
    url += (limit) ? `limit=${limit}&` : "";
    url += (withRecipe) ? `withRecipe=${withRecipe}` : "";
    return this.httpClient.get<OrderModel[]>(`${this.ALMUERZO_API_URL}/${url}}`);
  }

  public getAvailableIngredientsFromWarehouse(name?: string,
                                              orderBy?: string,
                                              limit?: number,) {
    let url = `ingredients?`
    url += (name) ? `name=${name}&` : "";
    url += (limit) ? `limit=${limit}&` : "";
    url += (orderBy && orderBy != "") ? `orderBy=${orderBy}&` : "";
    return this.httpClient.get<IngredientWarehouseModel[]>(`${this.BODEGA_API_URL}/${url}}`);
  }


  public getMarketPurchaseHistory(requestDate?: string,
                                  orderBy?: string,
                                  withIngredients?: boolean,
                                  limit?: number,) {
    let url = `market-purchase?`
    url += (requestDate) ? `request_date=${requestDate}&` : "";
    url += (limit) ? `limit=${limit}&` : "";
    url += (withIngredients) ? `withIngredients=${withIngredients}&` : "";
    url += (orderBy && orderBy != "") ? `orderBy=${orderBy}&` : "";
    return this.httpClient.get<MarketPurchaseModel[]>(`${this.BODEGA_API_URL}/${url}}`);
  }

  public getRecipes(withIngredientes?: boolean,
                    orderBy?: string,
                    limit?: number,) {
    let url = `recipe?`
    url += (limit) ? `limit=${limit}&` : "";
    url += (orderBy && orderBy != "") ? `orderBy=${orderBy}&` : "";
    url += (withIngredientes) ? `withIngredientes=${withIngredientes}` : "";
    return this.httpClient.get<RecipeModel[]>(`${this.ALMUERZO_API_URL}/${url}}`);
  }

}
