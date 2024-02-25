import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";

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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    sessionStorage.setItem("accessToken", user.accessToken);
    sessionStorage.setItem("email", user.email);
    const userLoggedIn = new CustomEvent("userLoggedIn", {
      detail: {
        isUserLoggedIn: true
      },
    });
    window.dispatchEvent(userLoggedIn);
  } else {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("email");
  }
});
