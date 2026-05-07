import React from "react";

export default function Dashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🏥 Hospital Dashboard</h1>

      <div style={{ marginTop: "30px" }}>

        

        {/* Add Doctor */}
        <button
        style={btnStyle}
        onClick={() => window.location="/hospital/add-doctor"}>
        Add Doctor
        </button>

        {/* Create Slots */}
       <button 
       style={btnStyle}
        onClick={() => window.location="/hospital/doctors"}>
       👨‍⚕️ View Doctors
        </button>

        {/* Logout */}
        <button
          style={btnStyle}
          onClick={() => {
            localStorage.clear();
            window.location = "/";
          }}
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
}

// 🔥 simple button style
const btnStyle = {
  padding: "15px",
  margin: "10px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white"
};