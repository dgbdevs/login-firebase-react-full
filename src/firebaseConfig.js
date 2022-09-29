import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API_KEY,
  authDomain: "meliapp-b6113.firebaseapp.com",
  projectId: "meliapp-b6113",
  storageBucket: "meliapp-b6113.appspot.com",
  messagingSenderId: "943066341249",
  appId: "1:943066341249:web:24bad699e6fd5a81ec9280",
  measurementId: "G-BX5NDDRHLK"
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth =getAuth(app)