import {Injectable} from "@angular/core";
import {deleteToken, getToken, MessagePayload, Messaging, onMessage} from "@angular/fire/messaging";
import {Observer} from "rxjs";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FireCloudMessagingService {

  constructor(private msg: Messaging) {
  }

  requestNotificationPermission() {
    return Notification.requestPermission().then(
      (notificationPermissions: NotificationPermission) => {
        if (notificationPermissions === "granted") {
          console.log("Granted");
        }
        if (notificationPermissions === "denied") {
          console.log("Denied");
        }
        return notificationPermissions;
      });
  }

  async generateFCMToken() {
    await this.requestNotificationPermission();
    const serviceWorkerRegistration = await navigator.serviceWorker.register("./firebase-messaging-sw.js", {
      type: "module",
    });
    return getToken(this.msg, {
      vapidKey: environment.FCMvapidKey,
      serviceWorkerRegistration: serviceWorkerRegistration,
    });
  }

  onMessage(callback: Observer<MessagePayload>): void {
    onMessage(this.msg, callback);
  }

  async deleteToken() {
    // We can also delete fcm tokens, make sure to also update this on your firestore db if you are storing them as well
    await deleteToken(this.msg);
  }
}
