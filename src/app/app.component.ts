import {Component} from '@angular/core';
import {MatDrawerMode, MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'almuerzos-gratis';
  mode?: MatDrawerMode;

  constructor(private router: Router) {
  }

  showInfo(link: any) {

  }

  goTo(s: string, drawer: MatSidenav) {
    drawer.close();
    this.router.navigate([s]);
  }
}
