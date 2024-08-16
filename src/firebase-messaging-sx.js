import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCpYoKOOpP3eEee5DZL0vBIFvu7dsMkjFA",
    authDomain: "sync-center-mobile.firebaseapp.com",
    projectId: "sync-center-mobile",
    storageBucket: "sync-center-mobile.appspot.com",
    messagingSenderId: "706747477585",
    appId: "1:706747477585:web:24ff6a62b64b68ab229270",
    measurementId: "G-TEZZKE79ZJ"
  };  

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = " Title";
  const notificationOptions = {
    body:  " Body",
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});