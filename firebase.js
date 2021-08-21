import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { config } from "./config";
const firebaseConfig = config;

let app = null;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const db = app.firestore();
export const auth = firebase.auth();
