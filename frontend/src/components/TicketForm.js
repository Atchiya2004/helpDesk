import React, { useState } from "react";
import API from "../services/api";

function TicketForm({ fetchTickets }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/tickets", {
        title,
        description,
        priority
      });

      alert("Ticket Created Successfully ");

      setTitle("");
      setDescription("");
      setPriority("Low");

      fetchTickets();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating ticket");
    }
  };

  return (
    <div className="ticket-form">
      <h3>Create Ticket</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ✅ Priority Dropdown */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}

export default TicketForm;