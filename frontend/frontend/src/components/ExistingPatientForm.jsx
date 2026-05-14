
import axios from "axios";
import { useEffect, useState } from "react";

function ExistingPatientForm({ patient }) {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
const [availableTimes, setAvailableTimes] = useState([]);

  const submitAppointment = async () => {
    const appointment = {
      appointmentDate,
      appointmentTime,
      reason,
      physician: patient.physician,
      location: patient.location,
    };

    await axios.post(
      `http://localhost:8080/api/appointments/book/${patient.id}`,
      appointment
    );

    alert("Appointment request submitted successfully!");
  };

  useEffect(() => {
  if (appointmentDate && patient?.physician?.id) {
    axios
      .get(
        `http://localhost:8080/api/appointments/available?physicianId=${patient.physician.id}&date=${appointmentDate}`
      )
      .then((res) => setAvailableTimes(res.data))
      .catch((err) => console.log(err));
  }
}, [appointmentDate, patient]);

  return (
    <div className="mt-8 bg-purple-50 border border-purple-100 rounded-2xl p-6">
      <h4 className="text-xl font-bold text-purple-700 mb-4">Patient Found</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p><b>Name:</b> {patient.firstName} {patient.lastName}</p>
        <p><b>DOB:</b> {patient.dob}</p>
        <p><b>Location:</b> {patient.location?.name}</p>
        <p><b>Doctor:</b> Dr. {patient.physician?.firstName} {patient.physician?.lastName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="border border-gray-200 p-3 rounded-xl"
        />

         <select
  value={appointmentTime}
  onChange={(e) => setAppointmentTime(e.target.value)}
  className="border border-gray-200 p-3 rounded-xl"
>
  <option value="">Select Available Time</option>

  {availableTimes.map((time) => (
    <option key={time} value={time}>
      {time}
    </option>
  ))}
</select>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="md:col-span-2 border border-gray-200 p-3 rounded-xl"
        >
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

        <button
          onClick={submitAppointment}
          className="md:col-span-2 bg-purple-700 text-white py-4 rounded-2xl font-semibold hover:bg-purple-800"
        >
          Request Appointment
        </button>
      </div>
    </div>
  );
}

export default ExistingPatientForm;