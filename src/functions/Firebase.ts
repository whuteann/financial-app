import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import { SPENDINGS, USERS } from "../constants/Firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBxajaBO7C7LRaIUTw3XEH-5tMZz4dzr5Q",
  authDomain: "finnance-e6d54.firebaseapp.com",
  projectId: "finnance-e6d54",
  storageBucket: "finnance-e6d54.appspot.com",
  messagingSenderId: "663783403523",
  appId: "1:663783403523:web:bdcbfe33708604bc489e36"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default async function run() {
  await firestore.settings({
    ignoreUndefinedProperties: true,
    merge: true,
  });
}

export const firestore: firebase.firestore.Firestore = firebase.firestore();
export const auth: firebase.auth.Auth = firebase.auth();
export const functions: firebase.functions.Functions = firebase.app().functions('asia-southeast1');
export const storage: firebase.storage.Storage = firebase.storage();

if (firebase.app.length === 0) {
  firestore.settings({
    ignoreUndefinedProperties: true,
    merge: true,
  });
}

// db ref
export const userRef = firestore.collection(USERS);
export const spendingRef = firestore.collection(SPENDINGS);