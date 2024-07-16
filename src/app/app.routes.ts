import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {RequestLunchComponent} from "./request-lunch/request-lunch.component";
import {OrdersListComponent} from "./orders-list/orders-list.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {MarketPurchasesHistoryComponent} from "./market-purchases-history/market-purchases-history.component";
import {IngredientsWarehouseListComponent} from "./ingredients-warehouse-list/ingredients-warehouse-list.component";

export const routes: Routes = [
  {path: '', component: RequestLunchComponent},
  {path: 'orders', component: OrdersListComponent},
  {path: 'recipes', component: RecipeListComponent},
  {path: 'market-purchases', component: MarketPurchasesHistoryComponent},
  {path: 'ingredients-warehouse', component: IngredientsWarehouseListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
