import { useState, useEffect } from "react";
import API from "../api";

export default function CreateRequest({ reload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState([]);

useEffect(() => {
  const fetchTeam = async () => {
    try {
      const res = await API.get("/auth/team-members");
      setEmployees(res.data);
    } catch (err) {
      console.log("Failed to load team employees");
    }
  };

  fetchTeam();
}, []);



  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await API.post("/requests", { title, description, assignedTo });
      setTitle("");
      setDescription("");
      setAssignedTo("");

      alert("Request created successfully!");
      reload();
    } catch (err) {
      setMessage("Failed to create request");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create New Request</h3>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", height: 70, marginBottom: 10 }}
          required
        />

        <select
  name="assignedTo"
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
  style={{ width: "100%", marginBottom: 10 }}
>
  <option value="">Assign To</option>
  <option value={JSON.parse(localStorage.getItem("user")).id}>
    Myself
  </option>

  {employees.map((emp) => (
    <option key={emp.id} value={emp.id}>
      {emp.name}
    </option>
  ))}
</select>


        <button type="submit">Submit Request</button>
      </form>

      {message && (
        <p style={{ color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
