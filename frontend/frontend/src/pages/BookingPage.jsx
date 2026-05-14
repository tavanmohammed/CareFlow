import Navbar from "../components/Navbar";
import BookingForm from "../components/BookingForm";

function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-14 text-center">
        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
          Multi-Location Patient Booking
        </span>

        <h2 className="text-5xl font-bold text-gray-900 mt-6">
          Book your appointment with your family physician
        </h2>

        <p className="text-gray-600 mt-5 text-lg max-w-2xl mx-auto">
          Search by health card. If your profile is found, choose your appointment
          date and time. If not, complete the new patient request form.
        </p>
      </section>

      <section id="booking" className="px-6 pb-16">
        <BookingForm />
      </section>

      <div
        id="contact"
        className="bg-purple-700 text-white py-12 px-6 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">
          Contact Clinic
        </h2>

        <p>Downtown Clinic</p>
        <p>123 King Street, Toronto</p>
        <p>(416) 555-1234</p>
        <p>careflowclinic@gmail.com</p>
      </div>
    </div>
  );
}

export default BookingPage;