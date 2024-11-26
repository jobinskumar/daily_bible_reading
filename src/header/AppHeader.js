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
        setIsLoggedIn(false);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <>
      <div className="header-login d-flex justify-content-between">
        <h1 className="h2 mt-2 ms-3">Daily Bible Reading</h1>
        {isLoggedIn ? (
          <div className="dropdown mt-2 me-3 w-25">
            <button
              className="btn btn-light dropdown-toggle border w-100 text-truncate"
              type="button"
              aria-expanded="false"
              onClick={toggleDropdownMenu}
            >
              {userEmail}
            </button>
            {isShowDropdownMenu && (
              <ul className="dropdown-menu show mt-1 dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-small btn-light m-1 border"
            onClick={showLogin}
          >
            Login
          </button>
        )}
      </div>
    </>
  );
}
