import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {RequestLunchComponent} from "./request-lunch/request-lunch.component";

export const routes: Routes = [
  {path: '', component: RequestLunchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
