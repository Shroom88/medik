import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePatient } from "../../PatientContext";
import "../Home/Home.css";

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const { setSelectedPatient } = usePatient();

  useEffect(() => {
    fetch(`http://localhost:3000/patients/${id}`)
      .then((res) => res.json())
      .then((data) => setPatient(data))
      .catch((err) => console.error("Error fetching patient:", err));
  }, [id]);

  if (!patient) return <p>Loading patient details...</p>;

  return (
    <div className="home-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>
        {patient.name} (EGN: {patient.id})
      </h1>
      <button
        className="send-record-button"
        onClick={() => {
          fetch("http://localhost:3000/selectedPatient", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(patient),
          })
            .then(() => {
              console.log("Patient sent to doctor");
            })
            .catch((err) => console.error("Error sending to doctor:", err));
        }}
      >
        Send Records to Doctor
      </button>
      <div className="ambolator-section">
        <h3>Ambulatory Visits</h3>
        {patient.ambolator.map((amb) => (
          <div className="ambolator-entry" key={amb.date}>
            <p>
              <strong>Date:</strong> {amb.date}
            </p>
            <p>
              <strong>Conclusion:</strong> {amb.conclusion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientDetail;
