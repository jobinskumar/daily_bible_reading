import { useContext, useState } from "react";
import { AuthContext, auth } from "../auth/Auth";
import { signOut } from "firebase/auth";

export default function AppHeader({ setIsShowLogin }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  let userEmail = sessionStorage.getItem("email");
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);

  function showLogin() {
    setIsShowLogin(true);
  }

  function toggleDropdownMenu() {
    setIsShowDropdownMenu(!isShowDropdownMenu);
  }

  function logout() {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("dailyStatus");
        sessionStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <>
      <div className="header-login pt-20">
        <h1 className="header-title text-4xl mt-0 mb-10 ml-2 font-semibold">
          Daily Bible Reading
        </h1>
        {isLoggedIn ? (
          <div className="flex justify-between px-3 mb-5">
            <h1 className="text-gray-800 text-lg">
              Welcome,{" "}
              <span className="font-bold text-blue-600">
                {userEmail.split("@")[0]}
              </span>
              !
            </h1>
            <button className="font-bold p-1 rounded underline" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-between px-3 mb-5">
            <h1 className="text-gray-800 text-lg">
              Welcome, <span className="font-bold text-blue-600">Guest</span>!
            </h1>
            <button className="font-bold p-1 rounded underline" onClick={showLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
}
