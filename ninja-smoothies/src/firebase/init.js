import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyACj5fpV0ld4zLnGbowFgFfwPuKYVWt1wI",
  authDomain: "ninja-smoothies-660b7.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-660b7.firebaseio.com",
  projectId: "ninja-smoothies-660b7",
  storageBucket: "ninja-smoothies-660b7.appspot.com",
  messagingSenderId: "416666740768",
  appId: "1:416666740768:web:516cea8aaf040de5efb445"
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
