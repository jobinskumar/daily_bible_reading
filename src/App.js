import { useEffect, useState } from "react";
import Login from "./login/Login";
import Home from "./home/Home";
import AppHeader from "./header/AppHeader";
import { AuthContext } from "./auth/Auth";

export default function App() {
  const [loggedInType, setLoggedInType] = useState(null);
  const [isShowLogin, setIsShowLogin] = useState(false);

  useEffect(() => {
    window.addEventListener("userLoggedIn", ({ detail }) => {
      setLoggedInType(detail.isUserLoggedIn ? "USER" : "GUEST");
      setIsShowLogin(false);
    });
  }, []);

  return (
    <>
      {isShowLogin && (!loggedInType || loggedInType === "GUEST") ? (
        <Login setIsShowLogin={setIsShowLogin} />
      ) : (
        <AuthContext.Provider value={{ loggedInType, setLoggedInType }}>
          <AppHeader setIsShowLogin={setIsShowLogin} />
          <Home />
        </AuthContext.Provider>
      )}
    </>
  );
}
