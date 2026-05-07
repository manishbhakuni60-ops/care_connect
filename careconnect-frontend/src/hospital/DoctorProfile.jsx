import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/hospital/doctors/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
  console.log(data);   // 👈 debug
  setDoctor(data);
});
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>👨‍⚕️ {doctor.name}</h2>
      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Fee: ₹{doctor.consultation_fee}</p>

      {/* 🔥 ACTION BUTTONS */}
       
 <button onClick={() => window.location = `/hospital/create-slot/${doctor.id}`}>
  ➕ Create Slot
</button>
<button onClick={() => window.location = `/hospital/doctor/${doctor.id}/appointments`}>
  📅 View Appointments
</button>

      <button onClick={() => alert("Reviews coming soon")}>
        ⭐ View Reviews
      </button>
    </div>
  );
}