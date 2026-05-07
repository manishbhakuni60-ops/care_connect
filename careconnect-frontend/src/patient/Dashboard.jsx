import React from "react";
import "../styles/dashboard.css";

export default function Dashboard() {

  return (

    
    <div className="dashboard-container">

<div className="top-bar">

  <h1>CareConnect</h1>

  <button
    className="logout-btn"
    onClick={() => {

      localStorage.clear();

      window.location = "/";
    }}
  >
    Logout
  </button>

</div>

      {/* HERO SECTION */}

      <div className="hero-section">

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          CareConnect helps you manage appointments,
          connect with trusted doctors, and experience
          smarter healthcare from anywhere.
          <br /><br />
          Book appointments instantly, track your healthcare journey,
          and stay updated with notifications and reviews —
          all in one place.
        </p>

      </div>

      {/* DASHBOARD CARDS */}

      <div className="cards-container">

        {/* VIEW DOCTORS */}

        <div className="dashboard-card">

          <div className="card-icon">
            👨‍⚕️
          </div>

          <h2>
            View Doctors
          </h2>

          <p>
            Explore experienced specialists,
            check doctor profiles, reviews,
            and available appointment slots.
          </p>

          <button
            onClick={() => window.location="/doctors"}
          >
            Explore Doctors
          </button>

        </div>

        {/* APPOINTMENTS */}

        <div className="dashboard-card">

          <div className="card-icon">
            📅
          </div>

          <h2>
            My Appointments
          </h2>

          <p>
            View all your confirmed,
            pending, and cancelled appointments
            in one place.
          </p>

          <button
            onClick={() => window.location="/appointments"}
          >
            View Appointments
          </button>

        </div>

        {/* REVIEWS */}

        <div className="dashboard-card">

          <div className="card-icon">
            ⭐
          </div>

          <h2>
            Write Reviews
          </h2>

          <p>
            Share your healthcare experience
            and help other patients choose
            the right doctor.
          </p>

          <button>
            Write Review
          </button>

        </div>

      </div>

    </div>
  );
}