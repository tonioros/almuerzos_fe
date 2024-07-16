import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from "./app.component";
import {RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppRoutingModule} from "./app.routes";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatListItem, MatListModule, MatNavList} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {RequestLunchComponent} from './request-lunch/request-lunch.component';
import {MatPrefix, MatSuffix} from "@angular/material/form-field";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {environment} from "../environments/environment";
import {MatCardModule} from "@angular/material/card";
import {CardLunchComponent} from './card-lunch/card-lunch.component';
import {AgGridAngular} from "ag-grid-angular";
import {OrdersListComponent} from './orders-list/orders-list.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {LottieComponent, provideLottieOptions} from "ngx-lottie";
import player from 'lottie-web';
import {RecipeListComponent} from "./recipe-list/recipe-list.component";

@NgModule({
  declarations: [
    AppComponent,
    RequestLunchComponent,
    CardLunchComponent,
    OrdersListComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // Routing imports
    RouterOutlet,
    AppRoutingModule,
    // Material imports
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonModule,
    MatNavList,
    MatListItem,
    MatIconModule,
    MatPrefix,
    MatSuffix,
    MatListModule,
    MatCardModule,
    AgGridAngular,
    MatButtonToggleModule,
    LottieComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
    provideMessaging(() => getMessaging()),
    provideLottieOptions({
      player: () => player,
    }),
  ]
})
export class AppModule {
}
