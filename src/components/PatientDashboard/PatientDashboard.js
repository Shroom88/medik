import PatientDetail from "../PatientDetail/PatientDetail";
import DoctorView from "../DoctorView/DoctorView";
import "./Dashboard.css";

function PatientDashboard() {
  return (
    <div className="dashboard">
      <div className="panel">
        <PatientDetail />
      </div>
      <div className="panel doctor-panel">
        <DoctorView />
      </div>
    </div>
  );
}

export default PatientDashboard;
