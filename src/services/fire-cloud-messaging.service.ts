import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {deleteToken, getToken, Messaging} from "@angular/fire/messaging";
import {MessagePayload, onMessage} from "firebase/messaging";
import {Observer} from "rxjs";


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

  generateFCMToken() {
    this.requestNotificationPermission();
    return navigator.serviceWorker
      .register("./firebase-messaging-sw.js", {
        type: "module",
      })
      .then((serviceWorkerRegistration) => {
        return getToken(this.msg, {
          vapidKey: environment.FCMvapidKey,
          serviceWorkerRegistration: serviceWorkerRegistration,
        }).then((fcmToken) => {
          console.log('my fcm token', fcmToken);
          // This is a good place to then store it on your database for each user
          return fcmToken;
        });
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
