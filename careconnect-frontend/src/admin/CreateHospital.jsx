import React, { useState } from "react";

export default function CreateHospital() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const createHospital = async () => {
    const res = await fetch("http://localhost:5000/api/admin/create-hospital", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Hospital</h2>

      <input placeholder="Hospital Name" onChange={(e) => setName(e.target.value)} /><br /><br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <input
  placeholder="Phone"
  onChange={(e) => setPhone(e.target.value)}
/>
<br /><br />
      <button onClick={createHospital}>Create</button>
    </div>
  );
}