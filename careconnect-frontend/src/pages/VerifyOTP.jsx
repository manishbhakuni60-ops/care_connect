import React, { useState } from "react";

export default function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message.includes("success")) {
      window.location = "/";
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Verify OTP</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      /><br /><br />

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}