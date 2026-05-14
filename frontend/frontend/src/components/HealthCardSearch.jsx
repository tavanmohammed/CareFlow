function HealthCardSearch({
  healthCard,
  setHealthCard,
  searchPatient
}) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Health Card Number
      </label>

      <div className="flex gap-3">
        <input
          type="text"
          maxLength="10"
          value={healthCard}
          onChange={(e) => setHealthCard(e.target.value)}
          placeholder="Enter 10-digit health card number"
          className="flex-1 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={searchPatient}
          className="bg-purple-700 text-white px-6 rounded-xl hover:bg-purple-800"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default HealthCardSearch;