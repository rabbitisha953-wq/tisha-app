// Firebase config (tisha-video-chat)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAmXYLfvLBDCV-0ESrFFYEh1veV2DjqGIQ",
  authDomain: "tisha-video-chat.firebaseapp.com",
  projectId: "tisha-video-chat",
  storageBucket: "tisha-video-chat.firebasestorage.app",
  messagingSenderId: "533648173757",
  appId: "1:533648173757:web:e9fd59914cee8d2bc165d4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db, RecaptchaVerifier, signInWithPhoneNumber };
