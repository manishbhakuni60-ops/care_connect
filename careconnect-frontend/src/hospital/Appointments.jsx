import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Appointments() {
  const { id } = useParams(); // doctorId optional
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    let url = "http://localhost:5000/api/hospital/appointments";

    if (id) {
      url = `http://localhost:5000/api/hospital/appointments/doctor/${id}`;
      console.log("Doctor ID:", id);
      console.log("API URL:", url);
    }

    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, [id]);

  const confirmAppointment = async (id) => {
    await fetch(`http://localhost:5000/api/hospital/appointments/confirm/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    fetchAppointments(); // ✅ no reload
  };

  const cancelAppointment = async (id) => {
    await fetch(`http://localhost:5000/api/hospital/appointments/cancel/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    fetchAppointments(); // ✅ no reload
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{id ? "Doctor Appointments" : "All Appointments"}</h2>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        appointments.map(app => (
          <div key={app.id}>
            👤 Patient ID: {app.patient_id} <br />
            👨‍⚕️ Doctor: {app.doctor_name} <br />
            Status: {app.status}
            <br /><br />

            <button onClick={() => confirmAppointment(app.id)}>✅ Confirm</button>
            <button onClick={() => cancelAppointment(app.id)}>❌ Cancel</button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}