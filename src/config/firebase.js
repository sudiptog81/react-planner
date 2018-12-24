import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAv1ftqC9wPDiJ1Q9--PBXxVaK1WbS1mRk",
  authDomain: "sudipto-marioplan.firebaseapp.com",
  databaseURL: "https://sudipto-marioplan.firebaseio.com",
  projectId: "sudipto-marioplan",
  storageBucket: "sudipto-marioplan.appspot.com",
  messagingSenderId: "831995399787"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
