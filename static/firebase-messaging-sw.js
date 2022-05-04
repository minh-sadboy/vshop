importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/8.10.0/firebase-app.min.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/8.10.0/firebase-messaging.min.js');

var config = {
    apiKey: "AIzaSyD0hcNbIrkl840LtSiUg4uHD8lhylrlw50",
    authDomain: "vivi-2d40a.firebaseapp.com",
    projectId: "vivi-2d40a",
    storageBucket: "vivi-2d40a.appspot.com",
    messagingSenderId: "694646348996",
    appId: "1:694646348996:web:76de71db898699d3dc3d91",
};
firebase.initializeApp(config);


const messaging = firebase.messaging();

messaging.getToken({ vapidKey: 'BJbgW93uDrDSgaW-2gna1MAA4TElZvPrarcAW7aOyoFxVAX3vA0crTmDc8VEcGK1mqL2ZgyR4F92DBetpZf1hXY' }).then((currentToken) => {
    if (currentToken) {
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});


messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  