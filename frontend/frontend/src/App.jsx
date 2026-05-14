import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;