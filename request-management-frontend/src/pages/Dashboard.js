import { useEffect, useState } from "react";
import API from "../api";
import CreateRequest from "../Components/CreateRequest";
import RequestList from "../Components/RequestList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.log("Error fetching requests", err.response?.data);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>
        Welcome, {user.name} ({user.role})
      </h2>

      <button onClick={logout} style={{ marginTop: 10 }}>
        Logout
      </button>

      {user.role === "EMPLOYEE" && <CreateRequest reload={fetchRequests} />}

      <RequestList requests={requests} reload={fetchRequests} />
    </div>
  );
}
