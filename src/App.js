import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import PatientDetail from "./components/PatientDetail/PatientDetail";
import DoctorView from "./components/DoctorView/DoctorView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patients/:id" element={<PatientDetail />} />
      <Route path="/doctor" element={<DoctorView />} />
    </Routes>
  );
}

export default App;
