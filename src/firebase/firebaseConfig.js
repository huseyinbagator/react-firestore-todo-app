import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "APİ_KEY",
  authDomain: "AUTH_DOMEİN",
  databaseURL: "DATA_BASE_URL",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGİNG_SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
