import {AfterViewInit, Component} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FireCloudMessagingService} from "../../services/fire-cloud-messaging.service";

@Component({
  selector: 'app-request-lunch',
  templateUrl: './request-lunch.component.html',
  styleUrl: './request-lunch.component.scss'
})
export class RequestLunchComponent implements AfterViewInit {
  constructor(private apiService: ApiService, private fcmService: FireCloudMessagingService) {
  }

  ngAfterViewInit(): void {
  }


  requestLunch() {
    this.fcmService.requestNotificationPermission().then(notificationPermissions => {
      if (notificationPermissions === "granted") {
        this.fcmService.generateFCMToken().then(fcmToken => {
          if (fcmToken) {
            localStorage.setItem("fcmToken", fcmToken);
            this.sendRequest(fcmToken)
          } else {
            console.log("FCM Empty!!");
          }
        })
      }
      if (notificationPermissions === "denied") {
        console.log("Denied");
      }
    });

  }

  private sendRequest(fcmToken: string) {
    let dateNow = new Date().toISOString();
    dateNow = dateNow.replace("T", " ");
    dateNow = dateNow.substring(0, dateNow.length - 5);
    this.apiService.requestANewOrder(dateNow, fcmToken).subscribe({
      next: value => {
        console.log(value);
      }
    })
  }
}
