import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    
 apiKey: "AIzaSyCHGD2KBTtTUYIcG1NNbkC4IHlKz9h8jLQ",
 authDomain: "catch-of-the-day-kat-kemmis.firebaseapp.com",
 databaseURL: "https://catch-of-the-day-kat-kemmis.firebaseio.com"     
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;