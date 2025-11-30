import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    managerId: "",
  });

  const [managers, setManagers] = useState([]);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful! Please login now.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed! Check form and try again.");
    }
  };

  // 🔥 Always fetch managers publicly (no token required)
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await API.get("/auth/managers");
        setManagers(res.data);
      } catch (err) {
        console.log("Managers fetch failed:", err);
      }
    };

    fetchManagers();
  }, []); // ← No dependency on role anymore

  return (
    <div className="container">
      <div style={{ width: "300px", margin: "40px auto" }}>
        <h3>Signup</h3>
        <form onSubmit={handleSignup}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 10 }}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 10 }}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 10 }}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 10 }}
          >
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="MANAGER">MANAGER</option>
          </select>

          {form.role === "EMPLOYEE" && (
            <select
              name="managerId"
              value={form.managerId}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 10 }}
              required
            >
              <option value="">Select Manager</option>
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          )}

          <button type="submit">Signup</button>
        </form>

        <button
          onClick={() => navigate("/login")}
          style={{ marginTop: 10 }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
