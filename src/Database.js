// Initialize Firebase
import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyBsUbgbtSp9zlB59kKcYs72aoItsBkn608",
    authDomain: "vuejs-371b9.firebaseapp.com",
    databaseURL: "https://vuejs-371b9.firebaseio.com",
    projectId: "vuejs-371b9",
    storageBucket: "vuejs-371b9.appspot.com",
    messagingSenderId: "535220855441"
};
let firebaseApp = firebase.initializeApp(config);
let db = firebaseApp.database();
export default db