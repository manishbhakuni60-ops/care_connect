import React, { useState } from "react";

export default function AddDoctor() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [fee, setFee] = useState("");

  const addDoctor = async () => {
    const res = await fetch("http://localhost:5000/api/hospital/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        name,
        specialization,
        experience,
        consultation_fee: fee
      })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Add Doctor</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br /><br />
      <input placeholder="Specialization" onChange={(e) => setSpecialization(e.target.value)} /><br /><br />
      <input placeholder="Experience" onChange={(e) => setExperience(e.target.value)} /><br /><br />
      <input placeholder="Fee" onChange={(e) => setFee(e.target.value)} /><br /><br />

      <button onClick={addDoctor}>Add Doctor</button>
    </div>
  );
}