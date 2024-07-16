import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {RequestLunchComponent} from "./request-lunch/request-lunch.component";
import {OrdersListComponent} from "./orders-list/orders-list.component";

export const routes: Routes = [
  {path: '', component: RequestLunchComponent},
  {path: 'orders', component: OrdersListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
