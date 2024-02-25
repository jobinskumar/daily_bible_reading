import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/Auth";

function Login({setIsLoggedIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userLoggedIn = new CustomEvent("userLoggedIn", {
            detail: {
              isUserLoggedIn: true
            },
          });
          window.dispatchEvent(userLoggedIn);
          sessionStorage.setItem("accessToken", user.accessToken);
        })
        .catch((error) => {
          setErrorMessage("Invalid username or password");
        });
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
