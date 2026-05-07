import React, { useState } from "react";
import "../styles/auth.css";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            password
          })
        }
      );

      const data = await res.json();

      alert(data.message);

      // redirect to OTP verify
      window.location = "/verify";

    } catch (err) {

      console.log(err);

      alert("Registration failed");
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <div className="icon-box">
          🩺
        </div>

        <h1>Create Account</h1>

        <p>
          Join CareConnect and book
          <br />
          appointments easily.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Create Account
        </button>

        <div className="bottom-link">

          Already have an account?

          <span
            onClick={() => window.location="/"}
          >
            Login
          </span>

        </div>

      </div>

    </div>
  );
}