import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBbkMeykuME2iWY3XbXLtPDM2Y3rCJO7Cg",
  authDomain: "voicify-cb6d8.firebaseapp.com",
  projectId: "voicify-cb6d8",
  storageBucket: "voicify-cb6d8.appspot.com",
  messagingSenderId: "179480580323",
  appId: "1:179480580323:web:2478f7ba10cc300623f5d6",
  measurementId: "G-R2FMCEV1LF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);