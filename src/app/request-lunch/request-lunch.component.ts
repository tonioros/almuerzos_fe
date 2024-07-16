import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FireCloudMessagingService} from "../../services/fire-cloud-messaging.service";
import {OrderModel} from "../../models/order.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-lunch',
  templateUrl: './request-lunch.component.html',
  styleUrl: './request-lunch.component.scss'
})
export class RequestLunchComponent implements AfterViewInit {
  isSendingOrder = false;
  pendingOrderList: OrderModel[] = [];
  completedOrderList: OrderModel[] = [];
  showMore: boolean = false;
  showCompletedAlert: boolean = false

  constructor(private apiService: ApiService, private fcmService: FireCloudMessagingService,
              private cdr: ChangeDetectorRef, public router: Router) {
  }

  ngAfterViewInit(): void {
    this.loadOrders();
  }

  async requestLunch() {
    const notificationPermissions = await this.fcmService.requestNotificationPermission();
    if (notificationPermissions === "granted") {
      this.fcmService.generateFCMToken().then(fcmToken => {
        if (fcmToken) {
          localStorage.setItem("fcmToken", fcmToken);
          this.sendRequest(fcmToken)
        } else {
          console.log("FCM Empty!!");
        }
      });
    }
    if (notificationPermissions === "denied") {
      console.log("Denied");
    }
  }

  loadOrders() {
    const fcmToken = localStorage.getItem("fcmToken") || undefined;
    this.apiService
      .getOrders(
        undefined,
        fcmToken,
        'desc',
        6,
        true
      )
      .subscribe({
        next: orderList => {
          this.showMore = orderList.length > 5
          if (this.showMore) {
            orderList = orderList.slice(0, 5);
          }
          this.pendingOrderList = orderList.filter(o => o.status === "pending");
          this.completedOrderList = orderList.filter(o => o.status === "completed");
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
        this.subscribeToFCM();
        this.isSendingOrder = false;
        this.pendingOrderList.push(value);
      }, error: err => (this.isSendingOrder = false)
    })
  }

  private subscribeToFCM() {
    this.fcmService.onMessage({
      next: notificationMessage => {
        const data = notificationMessage.data || {};
        const orderResp = JSON.parse(data['order'] as string) as OrderModel;
        this.updateOrderInfo(orderResp);
        const notification = new Notification(notificationMessage.notification?.title || "Tu comida esta lista", {
          body: notificationMessage.notification?.body,
          icon: notificationMessage.notification?.image,
        });
        notification.onclick = function () {
          window.parent.focus();
          notification.close();
        };
      },
      error: _ => {
        console.error(_);
      },
      complete: () => {
        console.info("Termino onMessage()")
      }
    })
  }

  private updateOrderInfo(order: OrderModel) {
    this.showCompletedAlert = true;
    const listId = this.pendingOrderList.findIndex(o => o.id === order.id);
    if (listId > -1) {
      this.pendingOrderList.splice(listId, 1);
      this.completedOrderList.push(order);
      setTimeout(() => {
        this.showCompletedAlert = false;
        this.cdr.detectChanges();
      }, 3000);
    }
    this.cdr.detectChanges();
  }

}
