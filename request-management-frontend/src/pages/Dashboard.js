import { useEffect, useState } from "react";
import API from "../api";
import CreateRequest from "../Components/CreateRequest";
import RequestList from "../Components/RequestList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Redirect to login if missing token / user
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    // redirect to proper route depending on role
    if (user.role === "MANAGER") {
      navigate("/dashboard/manager");
    } else {
      navigate("/dashboard/employee");
    }
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.log("Error fetching requests:", err.response?.data);
    }
  };

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>
        Welcome, {user.name} ({user.role})
      </h2>

      <button onClick={logout} style={{ marginTop: 10 }}>
        Logout
      </button>

      {/* Employee can create requests */}
      {user.role === "EMPLOYEE" && <CreateRequest reload={fetchRequests} />}

      {/* Both roles can view list */}
      <RequestList requests={requests} reload={fetchRequests} />
    </div>
  );
}
