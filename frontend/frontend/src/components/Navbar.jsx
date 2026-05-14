function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div>
          <h1 className="text-2xl font-bold text-purple-700">
            CareFlow
          </h1>
          <p className="text-xs text-gray-500">
            Patient Booking System
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-700 hover:text-purple-700 font-medium">
            Book Appointment
          </button>

          <button className="text-gray-700 hover:text-purple-700 font-medium">
            Contact Clinic
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;