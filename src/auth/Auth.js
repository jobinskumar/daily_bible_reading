import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";
import { getDatabase } from "firebase/database";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const firebaseConfig = {
  apiKey: "---------API-KEY---------",
  authDomain: "my-bible-reading.firebaseapp.com",
  projectId: "my-bible-reading",
  storageBucket: "my-bible-reading.appspot.com",
  messagingSenderId: "---------ID---------",
  appId: "---------APP-ID---------",
  databaseURL: "https://my-bible-reading-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    sessionStorage.setItem("email", user.email);
    const userLoggedIn = new CustomEvent("userLoggedIn", {
      detail: {
        isUserLoggedIn: true
      },
    });
    window.dispatchEvent(userLoggedIn);
  } else {
    sessionStorage.removeItem("email");
  }
});
