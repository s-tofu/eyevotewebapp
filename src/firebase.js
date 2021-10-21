// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDnNj_L3Ogo0TXkGNhVLMH2nQ4ILIug6ig",
  authDomain: "eyevote-remote.firebaseapp.com",
  projectId: "eyevote-remote",
  storageBucket: "eyevote-remote.appspot.com",
  messagingSenderId: "842441638283",
  appId: "1:842441638283:web:e6470c3e849fbb3714ef8e",
  measurementId: "G-ETZZ4VK7MF"
});

var db = firebaseApp.firestore();

export { db }