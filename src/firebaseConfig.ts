import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3SYWk95MVxDtKiDjkwCIyLZGFOu2JIuQ",
  authDomain: "ifrouteview.firebaseapp.com",
  projectId: "ifrouteview",
  storageBucket: "ifrouteview.appspot.com",
  messagingSenderId: "572957621013",
  appId: "1:572957621013:web:5cf38e761fdc21643c071c",
  measurementId: "G-31GMYWCJF0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);