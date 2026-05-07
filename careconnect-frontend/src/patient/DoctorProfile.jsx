import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/doctorProfile.css";

export default function DoctorProfile() {

  const { id } = useParams();

  // STATES

  const [doctor, setDoctor] = useState(null);

  const [slots, setSlots] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [loadingSlots, setLoadingSlots] = useState(true);

  const [loadingReviews, setLoadingReviews] = useState(true);

  // =========================
  // FETCH DOCTOR DETAILS
  // =========================

  useEffect(() => {

    fetch(`http://localhost:5000/api/patient/doctors/${id}`, {

      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token")
      }

    })

      .then(res => res.json())

      .then(data => {

        console.log("Doctor:", data);

        setDoctor(data);
      })

      .catch(err => {
        console.log(err);
      });

  }, [id]);

  // =========================
  // FETCH SLOTS
  // =========================

  useEffect(() => {

    fetch(`http://localhost:5000/api/patient/slots/${id}`, {

      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token")
      }

    })

      .then(res => res.json())

      .then(data => {

        console.log("Slots:", data);

        if (Array.isArray(data)) {
          setSlots(data);
        } else {
          setSlots([]);
        }

        setLoadingSlots(false);
      })

      .catch(() => {

        setSlots([]);

        setLoadingSlots(false);
      });

  }, [id]);

  // =========================
  // FETCH REVIEWS
  // =========================

  useEffect(() => {

    fetch(`http://localhost:5000/api/patient/reviews/${id}`, {

      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token")
      }

    })

      .then(res => res.json())

      .then(data => {

        console.log("Reviews:", data);

        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }

        setLoadingReviews(false);
      })

      .catch(() => {

        setReviews([]);

        setLoadingReviews(false);
      });

  }, [id]);

  // =========================
  // BOOK SLOT
  // =========================

  const bookSlot = async (slotId) => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/patient/book",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              "Bearer " + localStorage.getItem("token")
          },

          body: JSON.stringify({
            slot_id: slotId
          })
        }
      );

      const data = await res.json();

      alert(data.message);

    } catch (err) {

      alert("Booking failed");
    }
  };

  return (

    <div className="doctor-profile-page">

      {/* HERO SECTION */}

      <div className="doctor-hero">

        <div className="doctor-avatar">
          👨‍⚕️
        </div>

        <div>

          <h1>
            {doctor?.name || "Loading..."}
          </h1>

          <p>
            {doctor?.specialization || "Doctor"}
          </p>

        </div>

      </div>

      {/* DETAILS GRID */}

      <div className="profile-grid">

        {/* PERSONAL DETAILS */}

        <div className="profile-card">

          <h2>
            Personal Details
          </h2>

          <p>
            <strong>Experience:</strong>
            {" "}
            {doctor?.experience || "N/A"} Years
          </p>

          <p>
            <strong>Consultation Fee:</strong>
            {" "}
            ₹{doctor?.consultation_fee || "N/A"}
          </p>

          <p>
            <strong>Specialization:</strong>
            {" "}
            {doctor?.specialization || "N/A"}
          </p>

          <p>
            Dedicated to providing
            high-quality healthcare
            and patient care services.
          </p>

        </div>

        {/* ACHIEVEMENTS */}

        <div className="profile-card">

          <h2>
            Achievements
          </h2>

          <ul>

            <li>
              🏆 Best Doctor Award 2024
            </li>

            <li>
              📚 Published 20+ Medical Papers
            </li>

            <li>
              👨‍⚕️ 5000+ Successful Consultations
            </li>

            <li>
              ⭐ Top Rated Specialist
            </li>

          </ul>

        </div>

      </div>

      {/* AVAILABLE SLOTS */}

      <div className="profile-card">

        <h2>
          Available Slots
        </h2>

        {loadingSlots ? (

          <p>
            Loading slots...
          </p>

        ) : slots.length === 0 ? (

          <p>
            No slots available
          </p>

        ) : (

          slots.map(slot => (

            <div
              key={slot.id}
              className="slot-box"
            >

              <div>

                📅 {slot.slot_date}
                <br />
                ⏰ {slot.slot_time}

              </div>

              <button
                onClick={() => bookSlot(slot.id)}
              >
                Book Appointment
              </button>

            </div>
          ))
        )}

      </div>

      {/* REVIEWS */}

      <div className="profile-card">

        <h2>
          Patient Reviews
        </h2>

        {loadingReviews ? (

          <p>
            Loading reviews...
          </p>

        ) : reviews.length === 0 ? (

          <p>
            No reviews yet
          </p>

        ) : (

          reviews.map(r => (

            <div
              key={r.id}
              className="review-box"
            >

              <h3>
                ⭐ {r.rating}/5
              </h3>

              <p>
                {r.comment}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}