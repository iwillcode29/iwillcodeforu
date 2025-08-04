import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLhaCuj3g51a3MbF7js72tfrYS9CAAOW4",
  authDomain: "yoga-booking-app-4eeb5.firebaseapp.com",
  databaseURL: "https://yoga-booking-app-4eeb5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yoga-booking-app-4eeb5",
  storageBucket: "yoga-booking-app-4eeb5.firebasestorage.app",
  messagingSenderId: "1088494294490",
  appId: "1:1088494294490:web:d3c98150fc4b9607031ce3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
