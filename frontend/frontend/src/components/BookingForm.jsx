import { useEffect, useState } from "react";
import axios from "axios";

import PatientTypeSelector from "./PatientTypeSelector";
import HealthCardSearch from "./HealthCardSearch";
import ExistingPatientForm from "./ExistingPatientForm";
import NewPatientForm from "./NewPatientForm";

function BookingForm() {
  const [selectedType, setSelectedType] = useState("existing");
  const [healthCard, setHealthCard] = useState("");
  const [patient, setPatient] = useState(null);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [noHealthCard, setNoHealthCard] = useState(false);

  const [locations, setLocations] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      axios.get(`http://localhost:8080/api/physicians/location/${selectedLocation}`)
        .then((res) => setPhysicians(res.data))
        .catch((err) => console.log(err));
    } else {
      setPhysicians([]);
    }
  }, [selectedLocation]);

  const handleSelectType = (type) => {
  setSelectedType(type);
  setPatient(null);
  setHealthCard("");
  setSelectedLocation("");
  setPhysicians([]);

  if (type === "existing") {
    setShowNewPatientForm(false);
    setNoHealthCard(false);
  }

  if (type === "new") {
    setShowNewPatientForm(true);
    setNoHealthCard(false);
  }

  if (type === "noHealthCard") {
    setShowNewPatientForm(true);
    setNoHealthCard(true);
  }
};

  const searchPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/patients/health-card/${healthCard}`
      );

      if (res.data && res.data.id) {
        setPatient(res.data);
        setShowNewPatientForm(false);
        setNoHealthCard(false);
      } else {
        setPatient(null);
        setShowNewPatientForm(true);
        setSelectedType("new");
      }
    } catch {
      setPatient(null);
      setShowNewPatientForm(true);
      setSelectedType("new");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 p-8 text-white">
        <h3 className="text-3xl font-bold">Book Appointment</h3>
        <p className="text-purple-100 mt-2">
          Search by health card or continue as a new patient.
        </p>
      </div>

      <div className="p-8">
        <PatientTypeSelector selectedType={selectedType} onSelect={handleSelectType} />

        {selectedType === "existing" && (
          <HealthCardSearch
            healthCard={healthCard}
            setHealthCard={setHealthCard}
            searchPatient={searchPatient}
          />
        )}

        {patient && <ExistingPatientForm patient={patient} />}

        {showNewPatientForm && (
          <NewPatientForm
            noHealthCard={noHealthCard}
            locations={locations}
            physicians={physicians}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        )}
      </div>
    </div>
  );
}

export default BookingForm;