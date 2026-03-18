import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxW_mSQ2MigytpHjnHOmvkz95qUjJlrIA",
  authDomain: "fitnessrehabapp-c3b78.firebaseapp.com",
  projectId: "fitnessrehabapp-c3b78",
  storageBucket: "fitnessrehabapp-c3b78.firebasestorage.app",
  messagingSenderId: "661386918925",
  appId: "1:661386918925:web:b1270ef7a4bd481481e944"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;