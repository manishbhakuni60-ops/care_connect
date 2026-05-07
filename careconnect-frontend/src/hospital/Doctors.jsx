import React, { useEffect, useState } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hospital/doctors", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>👨‍⚕️ Doctors</h2>

      {doctors.map(doc => (
        <div
          key={doc.id}
          style={cardStyle}
          onClick={() => window.location = `/hospital/doctor/${doc.id}`}
        >
          <h3>{doc.name}</h3>
          <p>{doc.specialization}</p>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "15px",
  margin: "10px auto",
  width: "300px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  cursor: "pointer"
};