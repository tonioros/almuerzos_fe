import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'almuerzos-gratis';
  mode?: MatDrawerMode;

  showInfo(link: any) {

  }
}
