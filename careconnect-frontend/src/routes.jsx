import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";

import PatientDashboard from "./patient/Dashboard";
import PatientDoctors from "./patient/Doctors";
import PatientDoctorProfile from "./patient/DoctorProfile";
import Appointments from "./patient/Appointments";

import HospitalDashboard from "./hospital/Dashboard";
import AddDoctor from "./hospital/AddDoctor";
import CreateSlot from "./hospital/CreateSlot";
import HospitalDoctors from "./hospital/Doctors";
import HospitalDoctorProfile from "./hospital/DoctorProfile";
import HospitalAppointments from "./hospital/Appointments";

import AdminDashboard from "./admin/Dashboard";
import CreateHospital from "./admin/CreateHospital";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyOTP />} />

        {/* PATIENT */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doctors" element={<PatientDoctors />} />
        <Route path="/doctor/:id" element={<PatientDoctorProfile />} />
        <Route path="/appointments" element={<Appointments />} />

        {/* HOSPITAL */}
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/hospital/add-doctor" element={<AddDoctor />} />
        <Route path="/hospital/doctors" element={<HospitalDoctors />} />
        <Route path="/hospital/doctor/:id" element={<HospitalDoctorProfile />} />
        <Route path="/hospital/create-slot/:doctorId" element={<CreateSlot />} />
        <Route path="/hospital/appointments" element={<HospitalAppointments />} />

        <Route
        path="/hospital/doctor/:id/appointments"
        element={<HospitalAppointments />}
        />
        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-hospital" element={<CreateHospital />} />

      </Routes>
    </BrowserRouter>
  );
}