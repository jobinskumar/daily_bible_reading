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
        <h1 className="mt-3 ms-3 fw-bold">Daily Bible Reading</h1>
        {isLoggedIn ? (
          <div className="dropdown mt-3 me-3 w-25">
            <button
              className="btn border-dark-subtle btn-light dropdown-toggle border w-100 text-truncate"
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
            className="btn btn-small btn-light mt-3 me-3 border border-dark-subtle"
            onClick={showLogin}
          >
            Login
          </button>
        )}
      </div>
    </>
  );
}
