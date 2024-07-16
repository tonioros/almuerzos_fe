import {AfterViewInit, Component} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FireCloudMessagingService} from "../../services/fire-cloud-messaging.service";
import {OrderModel} from "../../models/order.model";

@Component({
  selector: 'app-request-lunch',
  templateUrl: './request-lunch.component.html',
  styleUrl: './request-lunch.component.scss'
})
export class RequestLunchComponent implements AfterViewInit {
  constructor(private apiService: ApiService, private fcmService: FireCloudMessagingService) {
  }

  isSendingOrder = false;
  orderList: OrderModel[] = [];

  ngAfterViewInit(): void {
    this.loadOrders();
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

  loadOrders() {
    const fcmToken = localStorage.getItem("fcmToken") || undefined;
    this.apiService
      .getOrders(
        'pending',
        fcmToken,
        'desc',
        5
      )
      .subscribe({
        next: orderList => {
          this.orderList = orderList;
        }
      });
  }

  private sendRequest(fcmToken: string) {
    this.isSendingOrder = true;
    let dateNow = new Date().toISOString();
    dateNow = dateNow.replace("T", " ");
    dateNow = dateNow.substring(0, dateNow.length - 5);
    this.apiService.requestANewOrder(dateNow, fcmToken).subscribe({
      next: value => {
        this.isSendingOrder = false;
        this.orderList.push(value);
        this.fcmService.onMessage({
          next: notificationMessage => {
            console.log(notificationMessage);
            const notification = new Notification(notificationMessage.notification?.title || "Tu comida esta lista", {
              body: notificationMessage.notification?.body,
              icon: notificationMessage.notification?.image,
            });
          },
          error: _ => {
          },
          complete: () => {
          }
        })
      }, error: err => (this.isSendingOrder = false)
    })
  }
}
