import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Main dashboard router */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Dedicated manager + employee routes */}
        <Route
          path="/dashboard/manager"
          element={token && user?.role === "MANAGER" ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/employee"
          element={token && user?.role === "EMPLOYEE" ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Catch all unhandled paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
