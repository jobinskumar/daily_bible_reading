import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/Auth";

function Login({ setIsShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function hideLogin() {
    setIsShowLogin(false);
  }

  const handleSubmit = async (event) => {
    setIsAuthenticating(true);
    event.preventDefault();
    try {
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userLoggedIn = new CustomEvent("userLoggedIn", {
            detail: {
              isUserLoggedIn: true,
            },
          });
          window.dispatchEvent(userLoggedIn);
          sessionStorage.setItem("accessToken", user.accessToken);
        })
        .catch((error) => {
          setErrorMessage("Invalid username or password");
          setIsAuthenticating(false);
        });
    } catch (error) {
      setErrorMessage("Invalid username or password");
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded shadow-md p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-stone-400 p-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none outline-none transition-all"
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-stone-400 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded transition-colors shadow-sm"
              disabled={isAuthenticating}
            >
              Login
            </button>

            <button
              type="button"
              disabled={isAuthenticating}
              onClick={hideLogin}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-600 font-bold py-2 px-4 rounded border border-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="mailto:jobinskumar91@gmail.com?subject=Sign%20up%20for%20Daily%20Bible%20Reading&body=Hi%20Jobin%2C%0A%0AI%20would%20like%20to%20sign%20up%20for%20the%20Daily%20Bible%20Reading%20app.%0A%0AThank%20you!"
            className="text-blue-600 font-bold underline underline-offset-4 decoration-2"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
