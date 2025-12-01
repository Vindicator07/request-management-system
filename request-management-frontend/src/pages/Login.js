import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      alert("Login successful!");

      // Redirect based on role
      navigate(role === "MANAGER"
        ? "/dashboard/manager"
        : "/dashboard/employee"
      );

    } catch (err) {
      console.error(err);
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="container" style={{ width: 300, margin: "40px auto" }}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
          required
        />

        <button type="submit" style={{ width: "100%", marginBottom: 10 }}>
          Login
        </button>
      </form>

      <button
        onClick={() => navigate("/signup")}
        style={{ width: "100%", marginTop: 10 }}
      >
        Go to Signup
      </button>
    </div>
  );
}
