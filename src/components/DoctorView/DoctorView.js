import { useEffect, useState } from "react";
import "../Home/Home.css";

function DoctorView() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchSelectedPatient = () => {
      fetch("http://localhost:3000/selectedPatient")
        .then((res) => res.json())
        .then((data) => setPatient(data))
        .catch((err) => console.error("Error fetching selected patient:", err));
    };

    // Fetch initially and then every 5 seconds
    fetchSelectedPatient();
    const interval = setInterval(fetchSelectedPatient, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!patient || undefined || null) return <p>No patient selected.</p>;

  return (
    <div>
      <h1>Doctor View for {patient.name}</h1>
      <h2>EGN: {patient.id}</h2>
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

export default DoctorView;
