// This sample application is using 9.22, make sure you are importing the same version

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-sw.js";

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBH3i9QkCsXaCZBXe_e38uXe2_SOZ9VumE",
  authDomain: "lonas-outdoor.firebaseapp.com",
  projectId: "lonas-outdoor",
  storageBucket: "lonas-outdoor.appspot.com",
  messagingSenderId: "595994738566",
  appId: "1:595994738566:web:b10184f49c9fad5af5b607",
});

// Initialize Firebase
const messaging = getMessaging(firebaseApp);

