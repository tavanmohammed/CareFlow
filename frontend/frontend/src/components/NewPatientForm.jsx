import axios from "axios";
import { useEffect, useState } from "react";

function NewPatientForm({
  noHealthCard,
  locations,
  physicians,
  selectedLocation,
  setSelectedLocation,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [healthCardNumber, setHealthCardNumber] = useState("");

  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctorPreference, setDoctorPreference] = useState("");
  const [selectedPhysician, setSelectedPhysician] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyPhone, setPharmacyPhone] = useState("");
  const [allergies, setAllergies] = useState("");
  const [surgeryHistory, setSurgeryHistory] = useState("");
  const [lastVisit, setLastVisit] = useState("");

  const filteredPhysicians = physicians.filter((doctor) => {
    if (!doctorPreference || doctorPreference === "Anyone is Fine") return true;
    return doctor.gender === doctorPreference;
  });

  useEffect(() => {
    setAvailableTimes([]);
    setAppointmentTime("");

    if (appointmentDate && selectedPhysician) {
      axios
        .get(
          `http://localhost:8080/api/appointments/available?physicianId=${selectedPhysician}&date=${appointmentDate}`
        )
        .then((res) => setAvailableTimes(res.data))
        .catch((err) => console.log(err));
    }
  }, [appointmentDate, selectedPhysician]);

  const submitNewPatient = async () => {
    if (
      !firstName ||
      !lastName ||
      !dob ||
      !phone ||
      !email ||
      (!noHealthCard && !healthCardNumber) ||
      !pharmacyName ||
      !pharmacyPhone ||
      !allergies ||
      !surgeryHistory ||
      !lastVisit ||
      !doctorPreference ||
      !selectedLocation ||
      !selectedPhysician ||
      !appointmentDate ||
      !appointmentTime ||
      !reason
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const request = {
      firstName,
      lastName,
      dob,
      phone,
      email,
      reason,
      hasHealthCard: !noHealthCard,
      healthCardNumber: noHealthCard ? "" : healthCardNumber,
      pharmacyName,
      pharmacyPhone,
      allergies,
      surgeryHistory,
      lastVisit,
      doctorPreference,
      appointmentDate,
      appointmentTime,
      locationId: selectedLocation,
      physicianId: selectedPhysician,
      status: "PENDING",
    };

    try {
      await axios.post("http://localhost:8080/api/new-patients/submit", request);
      alert("New patient request submitted successfully!");
    } catch (error) {
      console.log(error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <h4 className="text-xl font-bold text-gray-800 mb-2">
        {noHealthCard ? "No Health Card Patient Form" : "New Patient Form"}
      </h4>

      <p className="text-gray-600 mb-6">
        Complete the intake form below. All fields are required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="border border-gray-200 p-3 rounded-xl" />
        <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="border border-gray-200 p-3 rounded-xl" />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Birth
          </label>
          <input required type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full border border-gray-200 p-3 rounded-xl" />
        </div>

        <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="border border-gray-200 p-3 rounded-xl" />

        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="md:col-span-2 border border-gray-200 p-3 rounded-xl" />

        {!noHealthCard && (
          <input required value={healthCardNumber} onChange={(e) => setHealthCardNumber(e.target.value)} maxLength="10" placeholder="Health Card Number" className="md:col-span-2 border border-gray-200 p-3 rounded-xl" />
        )}

        <input required value={pharmacyName} onChange={(e) => setPharmacyName(e.target.value)} placeholder="Preferred Pharmacy Name" className="border border-gray-200 p-3 rounded-xl" />
        <input required value={pharmacyPhone} onChange={(e) => setPharmacyPhone(e.target.value)} placeholder="Pharmacy Phone Number" className="border border-gray-200 p-3 rounded-xl" />

        <input required value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="Any allergies? If none, write No" className="border border-gray-200 p-3 rounded-xl" />
        <input required value={surgeryHistory} onChange={(e) => setSurgeryHistory(e.target.value)} placeholder="Any surgeries before? If none, write No" className="border border-gray-200 p-3 rounded-xl" />

        <input required value={lastVisit} onChange={(e) => setLastVisit(e.target.value)} placeholder="When was your last physician visit?" className="md:col-span-2 border border-gray-200 p-3 rounded-xl" />

        <select required value={doctorPreference} onChange={(e) => setDoctorPreference(e.target.value)} className="border border-gray-200 p-3 rounded-xl">
          <option value="">Physician Preference</option>
          <option value="Female">Female Physician</option>
          <option value="Male">Male Physician</option>
          <option value="Anyone is Fine">Anyone is Fine</option>
        </select>

        <select required value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="border border-gray-200 p-3 rounded-xl">
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name} — {location.address}
            </option>
          ))}
        </select>

        <select required value={selectedPhysician} onChange={(e) => setSelectedPhysician(e.target.value)} className="border border-gray-200 p-3 rounded-xl">
          <option value="">Select Physician</option>
          {filteredPhysicians.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              Dr. {doctor.firstName} {doctor.lastName} — {doctor.gender}
            </option>
          ))}
        </select>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Appointment Date
          </label>
          <input required type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="w-full border border-gray-200 p-3 rounded-xl" />
        </div>

        <select required value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="border border-gray-200 p-3 rounded-xl">
          <option value="">Select Available Time</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <select required value={reason} onChange={(e) => setReason(e.target.value)} className="md:col-span-2 border border-gray-200 p-3 rounded-xl">
          <option value="">Select Reason for Visit</option>
          <option value="General Checkup">General Checkup</option>
          <option value="Follow-up Appointment">Follow-up Appointment</option>
          <option value="Prescription Refill">Prescription Refill</option>
          <option value="Cold / Flu Symptoms">Cold / Flu Symptoms</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Blood Test Review">Blood Test Review</option>
          <option value="Referral Request">Referral Request</option>
          <option value="Medical Consultation">Medical Consultation</option>
          <option value="Other">Other</option>
        </select>

        {noHealthCard && (
          <div className="md:col-span-2 bg-yellow-100 border border-yellow-300 p-5 rounded-2xl">
            <p className="text-yellow-800 font-medium">
              Patients without a health card will be charged{" "}
              <span className="font-bold">$100 per visit.</span>
            </p>
          </div>
        )}

        <button onClick={submitNewPatient} className="md:col-span-2 bg-purple-700 text-white py-4 rounded-2xl font-semibold hover:bg-purple-800">
          Submit Request
        </button>
      </div>
    </div>
  );
}

export default NewPatientForm;