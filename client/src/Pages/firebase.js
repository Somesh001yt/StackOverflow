import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyDpflbTPXPex1f1mUBGYgbsujZn-a3HRE0",
  authDomain: "stack-overflow-bb689.firebaseapp.com",
  projectId: "stack-overflow-bb689",
  storageBucket: "stack-overflow-bb689.appspot.com",
  messagingSenderId: "212319382372",
  appId: "1:212319382372:web:904a5f764b9190305ba871",
  measurementId: "G-P693XPR5W0",
};

firebase.initializeApp(config);
export default firebase;
