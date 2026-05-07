import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Appointments() {
  const { id } = useParams();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/hospital/appointments/doctor/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      });
  }, [id]);

  const updateStatus = async (appointmentId, type) => {
    await fetch(
      `http://localhost:5000/api/hospital/appointments/${type}/${appointmentId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        appointments.map(app => (
          <div
            key={app.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{app.patient_name}</h3>

            <p>
              {app.slot_date} - {app.slot_time}
            </p>

            <p>Status: {app.status}</p>

            <button
              onClick={() =>
                updateStatus(app.id, "confirm")
              }
            >
              Confirm
            </button>

            <button
              onClick={() =>
                updateStatus(app.id, "cancel")
              }
            >
              Cancel
            </button>
          </div>
        ))
      )}
    </div>
  );
}