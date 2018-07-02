import Firebase from 'firebase';
 let config = {
    apiKey: "AIzaSyACCldiVJhGUmwkZAG5vgkSrNvJdK2-XDk",
    authDomain: "photohunt-3f94f.firebaseapp.com",
    databaseURL: "https://photohunt-3f94f.firebaseio.com",
    projectId: "photohunt-3f94f",
    storageBucket: "photohunt-3f94f.appspot.com",
    messagingSenderId: "234632532167"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();