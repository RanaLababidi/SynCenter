import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpYoKOOpP3eEee5DZL0vBIFvu7dsMkjFA",
  authDomain: "sync-center-mobile.firebaseapp.com",
  projectId: "sync-center-mobile",
  storageBucket: "sync-center-mobile.appspot.com",
  messagingSenderId: "706747477585",
  appId: "1:706747477585:web:24ff6a62b64b68ab229270"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
