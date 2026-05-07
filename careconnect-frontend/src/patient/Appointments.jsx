import React, { useEffect, useState } from "react";
import "../styles/appointments.css";

export default function Appointments() {

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH APPOINTMENTS

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/patient/appointments",
      {

        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token")
        }

      }
    )

      .then(res => res.json())

      .then(data => {

        console.log(data);

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
        }

        setLoading(false);
      })

      .catch(err => {

        console.log(err);

        setLoading(false);
      });

  }, []);

  // STATUS COLOR

  const getStatusClass = (status) => {

    if (status === "confirmed") {
      return "confirmed";
    }

    if (status === "cancelled") {
      return "cancelled";
    }

    return "pending";
  };

  return (

    <div className="appointments-page">

      {/* HEADER */}

      <div className="appointments-header">

        <h1>
          My Appointments
        </h1>

        <p>
          Track your healthcare appointments,
          confirmations, and booking status.
        </p>

      </div>

      {/* APPOINTMENTS */}

      {loading ? (

        <p className="loading">
          Loading appointments...
        </p>

      ) : appointments.length === 0 ? (

        <div className="empty-box">

          <h2>
            No appointments yet
          </h2>

          <p>
            Start by exploring doctors
            and booking your first appointment.
          </p>

          <button
            onClick={() => window.location="/doctors"}
          >
            Explore Doctors
          </button>

        </div>

      ) : (

        <div className="appointments-grid">

          {appointments.map(app => (

            <div
              key={app.id}
              className="appointment-card"
            >

              {/* TOP */}

             <div className="appointment-top">

  <div className="doctor-info">

    <div className="doctor-avatar-small">
      👨‍⚕️
    </div>

    <div>

      <h2>
        Dr. {app.doctor_name}
      </h2>

      <p>
        👨‍⚕️ {app.specialization}
      </p>

      <p>
        💰 Consultation Fee:
        ₹{app.consultation_fee}
      </p>

    </div>

  </div>

  <div
    className={`status-badge ${getStatusClass(app.status)}`}
  >
    {app.status}
  </div>

</div>

              {/* DETAILS */}

              <div className="appointment-details">

                <p>
                  📅
                  {" "}
                  {app.slot_date}
                </p>

                <p>
                  ⏰
                  {" "}
                  {app.slot_time}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}