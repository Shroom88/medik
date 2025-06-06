import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/patients")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setPatients(data);
      })
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1 className="title">Patient Records</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name or EGN..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="patient-list">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <Link to={`/patients/${patient.id}`} className="patient-card-link">
              <div className="patient-card" key={patient.id}>
                <h2>{patient.name}</h2>
                <p>
                  <strong>EGN:</strong> {patient.id}
                </p>
                <div className="ambolator-section">
                  <h3>Examinations</h3>
                  {[...patient.ambolator]
                    .slice(-2) // get last 2 entries
                    .reverse() // newest first
                    .map((amb) => (
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
            </Link>
          ))
        ) : (
          <p className="no-results">No patients found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
