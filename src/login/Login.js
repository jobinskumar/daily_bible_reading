import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/Auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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
    <div className="login-wrapper d-flex">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-4 fw-normal">Daily Bible Reading</h1>
          <div className="form-floating w-100">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email address</label>
          </div>
          <div className="form-floating w-100">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isAuthenticating}>
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
