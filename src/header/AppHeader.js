import { useContext, useState } from "react";
import { AuthContext, auth } from "../auth/Auth";
import { signOut } from "firebase/auth";

export default function AppHeader({ setIsShowLogin }) {
  const { loggedInType, setLoggedInType } = useContext(AuthContext);
  let userEmail = sessionStorage.getItem("email");

  function showLogin() {
    setIsShowLogin(true);
  }

  function logout() {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("dailyStatus");
        setLoggedInType("GUEST");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <>
      <div className="header-login pt-8">
        <h1 className="header-title text-4xl mt-0 mb-5 ml-2 font-semibold">
          Daily Bible Reading
        </h1>
        {loggedInType === "USER" ? (
          <div className="flex justify-between px-3 mb-5">
            <h1 className="text-gray-800 text-lg">
              Welcome,{" "}
              <span className="font-bold text-blue-600">
                {userEmail.split("@")[0]}
              </span>
              !
            </h1>
            <button
              className="font-bold p-1 rounded underline"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-between px-3 mb-5">
            <h1 className="text-gray-800 text-lg">
              Welcome, <span className="font-bold text-blue-600">Guest</span>!
            </h1>
            <button
              className="font-bold p-1 rounded underline"
              onClick={showLogin}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
}
