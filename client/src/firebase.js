import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';



var firebaseConfig = {
   apiKey: "AIzaSyApia1IEJjGTHNqnbper6FY_Z-JavNbWsk",
   authDomain: "manage-notification-745f1.firebaseapp.com",
   projectId: "manage-notification-745f1",
   storageBucket: "manage-notification-745f1.appspot.com",
   messagingSenderId: "185714206536",
   appId: "1:185714206536:web:ad6872c35eedf3affab57d",
   measurementId: "G-81FXZX4JVB"
}

initializeApp(firebaseConfig);
const messaging = getMessaging();


export const requestForToken = ()=>{
   return getToken(messaging, {vapidKey: 'BEd6EXmBoR2Bvh6ZZx8wBfxYWuoi4TcQ_JTkm63Yk1UoSKl5_4YU0VeZ6tGCybSLQlYCXv21180oVnyt5-l-hiU'})
      .then((currentToken) => {
         if(currentToken){
            console.log('current token for client', currentToken);
         }else{
            console.log('no registration token avaiable. Request persmission to generate one. ')
            
         }
      })
      .catch((err)=>{
         console.log('An error occured while retrieving token.', err);
      });
};

export const onMessageListener = ()=>
 new Promise((resolve)=>{
   //to handle messages when the app is in the foreground.
   onMessage(messaging, (payload)=>{
      console.log("payload", payload)
      resolve(payload);
   })
 })