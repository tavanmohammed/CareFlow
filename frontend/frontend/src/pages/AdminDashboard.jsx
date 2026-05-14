import { useEffect, useState } from "react";
import axios from "axios";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const fetchData = async () => {
    try {
      const appointmentRes = await axios.get(
        "http://localhost:8080/api/appointments"
      );

      const requestRes = await axios.get(
        "http://localhost:8080/api/new-patients"
      );

      setAppointments(appointmentRes.data);
      setRequests(requestRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  const uniqueDoctors = [
    ...new Set(appointments.map((a) => a.physician?.id).filter(Boolean)),
  ];

  const totalDailySlots = timeSlots.length * uniqueDoctors.length;

  const pending = appointments.filter((a) => a.status === "PENDING").length;

  const cancelled = appointments.filter(
    (a) => a.status === "CANCELLED"
  ).length;

  const confirmedAppointments = appointments.filter(
    (a) => a.status === "CONFIRMED"
  ).length;

  const approvedRequests = requests.filter(
    (r) => r.status === "APPROVED"
  ).length;

  const confirmed = confirmedAppointments + approvedRequests;

  const bookedToday = appointments.filter(
    (a) => a.appointmentDate === today && a.status !== "CANCELLED"
  ).length;

  const bookedTomorrow = appointments.filter(
    (a) => a.appointmentDate === tomorrow && a.status !== "CANCELLED"
  ).length;

  const openToday = Math.max(totalDailySlots - bookedToday, 0);
  const openTomorrow = Math.max(totalDailySlots - bookedTomorrow, 0);

  const calendarEvents = appointments
    .filter((a) => a.status !== "CANCELLED")
    .map((a) => {
      const start = new Date(`${a.appointmentDate} ${a.appointmentTime}`);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      return {
        title: `${a.patient?.firstName} ${a.patient?.lastName} - Dr. ${a.physician?.firstName}`,
        start,
        end,
      };
    });

  const confirmAppointment = async (id) => {
    await axios.put(`http://localhost:8080/api/appointments/confirm/${id}`);
    fetchData();
  };

  const cancelAppointment = async (id) => {
    await axios.put(`http://localhost:8080/api/appointments/cancel/${id}`);
    fetchData();
  };

  const approveRequest = async (id) => {
    await axios.put(`http://localhost:8080/api/new-patients/approve/${id}`);
    fetchData();
  };

  const rejectRequest = async (id) => {
    await axios.put(`http://localhost:8080/api/new-patients/reject/${id}`);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50 p-8">
      <h1 className="text-4xl font-bold text-purple-700 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-5 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold text-purple-700">{pending}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-500">Confirmed / Approved</p>
          <h2 className="text-3xl font-bold text-green-600">{confirmed}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-500">Cancelled</p>
          <h2 className="text-3xl font-bold text-red-500">{cancelled}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-500">Open Today</p>
          <h2 className="text-3xl font-bold text-blue-600">{openToday}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border">
          <p className="text-gray-500">Open Tomorrow</p>
          <h2 className="text-3xl font-bold text-orange-500">{openTomorrow}</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow border mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Appointment Calendar
        </h2>

        <div style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            views={["month", "week", "day"]}
            defaultView="month"
            date={calendarDate}
            onNavigate={(newDate) => setCalendarDate(newDate)}
            popup
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow border p-6 mb-8 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3">Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="py-3">
                  {a.patient?.firstName} {a.patient?.lastName}
                </td>

                <td>{a.appointmentDate}</td>
                <td>{a.appointmentTime}</td>

                <td>
                  Dr. {a.physician?.firstName} {a.physician?.lastName}
                </td>

                <td>{a.reason}</td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                    {a.status}
                  </span>
                </td>

                <td className="space-x-2">
                  {a.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => confirmAppointment(a.id)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => cancelAppointment(a.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <p className="text-gray-500 mt-4">No appointments yet.</p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow border p-6 mb-8 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Physician Schedule</h2>

        {appointments.length === 0 && (
          <p className="text-gray-500">No physician schedule yet.</p>
        )}

        {appointments.map((a) => (
          <div key={a.id} className="border-b py-4">
            <p className="font-semibold text-purple-700">
              Dr. {a.physician?.firstName} {a.physician?.lastName}
            </p>

            <p className="text-gray-700">
              {a.appointmentDate} at {a.appointmentTime}
            </p>

            <p className="text-gray-600">
              Patient: {a.patient?.firstName} {a.patient?.lastName}
            </p>

            <p className="text-sm text-gray-500">Status: {a.status}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow border p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">New Patient Requests</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3">Name</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Health Card</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-3">
                  {r.firstName} {r.lastName}
                </td>

                <td>{r.dob}</td>
                <td>{r.phone}</td>
                <td>{r.email}</td>

                <td>
                  {r.hasHealthCard ? r.healthCardNumber : "No Health Card"}
                </td>

                <td>{r.reason}</td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                    {r.status}
                  </span>
                </td>

                <td className="space-x-2">
                  {r.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => approveRequest(r.id)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg"
                      >
                        Approve/Register
                      </button>

                      <button
                        onClick={() => rejectRequest(r.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <p className="text-gray-500 mt-4">No new patient requests yet.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;