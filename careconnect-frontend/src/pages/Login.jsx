import React, { useState, useEffect } from "react";
import { loginUser } from "../services/api";
import "../styles/auth.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // clear old autofill
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async () => {

    try {

      const data = await loginUser({
        email,
        password
      });

      if (data.token) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Login successful ✅");

        // role based redirect
        if (data.role === "patient") {
          window.location = "/patient";

        } else if (data.role === "hospital") {
          window.location = "/hospital";

        } else if (data.role === "admin") {
          window.location = "/admin";
        }

      } else {
        alert(data.message);
      }

    } catch (err) {

      console.log(err);

      alert("Login failed");
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <div className="icon-box">
          🔐
        </div>

        <h1>Sign in with email</h1>

        <p>
          Welcome back to CareConnect.
          <br />
          Manage appointments easily.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

      
        <button onClick={handleLogin}>
          Get Started
        </button>

      

     

        <div className="bottom-link">
          Don't have an account?

          <span
            onClick={() => window.location="/register"}
          >
            Register
          </span>
        </div>

      </div>

    </div>
  );
}