import * as firebase from "firebase";

const settings = { timestampsInSnapshots: true };

const firebaseConfig = {
  apiKey: "AIzaSyAXihfoKM-N2yEaA0rowTD-jaUvlBNn-mk",
  authDomain: "devmap-a45b5.firebaseapp.com",
  databaseURL: "https://devmap-a45b5.firebaseio.com",
  projectId: "devmap-a45b5",
  storageBucket: "devmap-a45b5.appspot.com",
  messagingSenderId: "568386593495",
  appId: "1:568386593495:web:3f1343640f01e4f2"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);
export default firebase;
