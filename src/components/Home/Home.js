import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPatient, setNewPatient] = useState({ id: "", name: "" });

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

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    fetch("http://localhost:3000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Error fetching patients:", err));
  };

  const handleInputChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleDeletePatient = (id) => {
    if (
      window.confirm("Are you sure you want to delete this patient' record?")
    ) {
      fetch(`http://localhost:3000/patients/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          // Refresh patient list after deletion
          setPatients((prev) => prev.filter((p) => p.id !== id));
        })
        .catch((err) => console.error("Error deleting patient:", err));
    }
  };

  const handleCreatePatient = () => {
    if (!newPatient.name || !newPatient.id) {
      alert("Name and ID are required");
      return;
    }

    const patientToAdd = {
      ...newPatient,
      ambolator: [],
    };

    fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientToAdd),
    })
      .then((res) => res.json())
      .then(() => {
        fetchPatients(); // Refresh list
        setNewPatient({ name: "", id: "" }); // Reset form
      })
      .catch((err) => console.error("Error creating patient:", err));
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1 className="title">Patient Records</h1>

      <div className="create-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newPatient.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="id"
          placeholder="EGN"
          value={newPatient.id}
          onChange={handleInputChange}
        />
        <button className="add-patient-button" onClick={handleCreatePatient}>
          Add Patient
        </button>
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by name or EGN..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="patient-list">
        {filteredPatients.length > 0 ? (
          filteredPatients.reverse().map((patient) => (
            <>
              <div className="patient-card" key={patient.id}>
                <Link
                  to={`/patients/${patient.id}`}
                  className="patient-card-link"
                >
                  <h2>{patient.name}</h2>
                  <p>
                    <strong>EGN:</strong> {patient.id}
                  </p>
                </Link>
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
                <button
                  className="delete-button"
                  onClick={() => handleDeletePatient(patient.id)}
                >
                  <i class="material-icons">delete</i>
                </button>
              </div>
            </>
          ))
        ) : (
          <p className="no-results">No patients found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
