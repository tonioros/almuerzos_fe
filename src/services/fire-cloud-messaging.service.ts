import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {deleteToken, getToken, Messaging} from "@angular/fire/messaging";
import {onMessage} from "firebase/messaging";


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


  getDeviceToken() {
    return getToken(this.msg, {vapidKey: environment.FCMvapidKey})
      .then((token) => {
        console.log(token);
        // save the token in the server, or do whathever you want
        return token;
      })
      .catch((error) => console.log('Token error', error));
  }

  onMessage(): void {
    onMessage(this.msg, {
      next: (payload) => console.log('Message', payload),
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }

  async deleteToken() {
    // We can also delete fcm tokens, make sure to also update this on your firestore db if you are storing them as well
    await deleteToken(this.msg);
  }
}
