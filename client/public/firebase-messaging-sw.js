// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyApia1IEJjGTHNqnbper6FY_Z-JavNbWsk",
  authDomain: "manage-notification-745f1.firebaseapp.com",
  projectId: "manage-notification-745f1",
  storageBucket: "manage-notification-745f1.appspot.com",
  messagingSenderId: "185714206536",
  appId: "1:185714206536:web:ad6872c35eedf3affab57d",
  measurementId: "G-81FXZX4JVB"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});