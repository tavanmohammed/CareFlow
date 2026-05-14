function PatientTypeSelector({ selectedType, onSelect }) {
  const getCardStyle = (type) =>
    `p-5 rounded-2xl text-left border transition ${
      selectedType === type
        ? "bg-purple-50 border-purple-400"
        : "bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50"
    }`;

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">

      {/* Existing patient */}
      <button
        onClick={() => onSelect("existing")}
        className={getCardStyle("existing")}
      >
        <h4 className="font-bold text-purple-700 mb-2">
          Existing Patient
        </h4>

        <p className="text-sm text-gray-600">
          Search using your health card number
        </p>
      </button>

      {/* New patient */}
      <button
        onClick={() => onSelect("new")}
        className={getCardStyle("new")}
      >
        <h4 className="font-bold text-gray-800 mb-2">
          New Patient
        </h4>

        <p className="text-sm text-gray-600">
          Register for the first time
        </p>
      </button>

      {/* No health card */}
      <button
        onClick={() => onSelect("noHealthCard")}
        className={getCardStyle("noHealthCard")}
      >
        <h4 className="font-bold text-gray-800 mb-2">
          No Health Card
        </h4>

        <p className="text-sm text-gray-600">
          Continue without health coverage
        </p>
      </button>
    </div>
  );
}

export default PatientTypeSelector;