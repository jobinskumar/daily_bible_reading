import { useEffect, useState } from "react";
import Login from "./login/Login";
import Home from "./home/Home";
import AppHeader from "./header/AppHeader";
import { AuthContext } from "./auth/Auth";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("accessToken")
  );
  const [isShowLogin, setIsShowLogin] = useState(false);

  useEffect(() => {
    window.addEventListener("userLoggedIn", (data) => {
      setIsLoggedIn(true);
      setIsShowLogin(false);
    });
  }, []);

  return (
    <>
      {isShowLogin && !isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <AppHeader setIsShowLogin={setIsShowLogin} />
          <Home />
        </AuthContext.Provider>
      )}
    </>
  );
}
