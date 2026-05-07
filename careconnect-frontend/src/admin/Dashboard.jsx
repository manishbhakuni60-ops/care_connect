import React from "react";

export default function Dashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🛠️ Admin Dashboard</h1>

      <div style={{ marginTop: "30px" }}>

        {/* Create Hospital */}
        <button
          style={btnStyle}
          onClick={() => window.location = "/admin/create-hospital"}
        >
          🏥 Create Hospital
        </button>

        {/* View Hospitals (future) */}
        <button
          style={btnStyle}
          onClick={() => alert("View Hospitals (next step)")}
        >
          📋 View Hospitals
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

// 🎨 Button Style
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