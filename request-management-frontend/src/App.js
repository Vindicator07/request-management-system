import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role Based Dashboard Routes */}
        <Route
          path="/dashboard/manager"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/employee"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
