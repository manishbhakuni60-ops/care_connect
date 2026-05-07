import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    fetch("http://localhost:5000/api/patient/doctors", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  return (
    <div>
      <h2>Doctors</h2>

      {doctors.map(doc => (
        <div
          key={doc.id}
          onClick={() => {
            console.log("Clicked:", doc.id); // ✅ debug
            navigate(`/doctor/${doc.id}`);
          }}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{doc.name}</h3>
          <p>{doc.specialization}</p>
        </div>
      ))}
    </div>
  );
}