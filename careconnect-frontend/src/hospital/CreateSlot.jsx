import React, { useState } from "react";
import { useParams } from "react-router-dom"; // ✅ IMPORTANT

export default function CreateSlot() {
  const { doctorId } = useParams(); // ✅ GET FROM URL

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const createSlot = async () => {
    const res = await fetch("http://localhost:5000/api/hospital/slots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        doctor_id: doctorId, // ✅ USE URL ID
        slot_date: date,
        slot_time: time
      })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Create Slot for Doctor ID: {doctorId}</h2>

      {/* ❌ REMOVE doctorId input */}

      <input type="date" onChange={(e) => setDate(e.target.value)} /><br /><br />
      <input type="time" onChange={(e) => setTime(e.target.value)} /><br /><br />

      <button onClick={createSlot}>Create Slot</button>
    </div>
  );
}