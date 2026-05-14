import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const login = async () => {
  try {
    const res = await axios.post("http://localhost:8080/api/admin/login", {
      password,
    });

    if (res.data.success) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin";
    } else {
      alert("Invalid admin password");
    }
  } catch (error) {
    console.log(error);
    alert("Login failed");
  }
};

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">
          Admin Login
        </h1>

        <p className="text-gray-500 mb-6">
          Clinic staff access only.
        </p>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-xl mb-4"
        />

        <button
          onClick={login}
          className="w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;