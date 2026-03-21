import React, { useState, useEffect } from "react";
import API from "../services/api";

function AdminDashboard() {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // ✅ filter state

  const fetchTickets = async () => {
    try {
      const res = await API.get("/tickets/all");
      setTickets(res.data);
    } catch (err) {
      alert("Error fetching tickets");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tickets/${id}`, { status });
      fetchTickets();
    } catch (err) {
      alert("Error updating status");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ✅ PRIORITY SORTING (High → Medium → Low)
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  // ✅ FILTER + SORT
  const filteredTickets = tickets
    .filter(ticket => {
      if (filter === "All") return true;
      return ticket.status === filter;
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="dashboard">

      <h2>Admin Dashboard</h2><br/>

      {/* ✅ FILTER TABS */}
      <div className="filter-tabs">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
        <button onClick={() => setFilter("InProgress")}>In Progress</button>
        <button onClick={() => setFilter("Resolved")}>Resolved</button>
      </div>

      {loading ? (
        <p>Loading tickets...</p>
      ) : filteredTickets.length === 0 ? (
        <p className="no-ticket">No tickets found</p>
      ) : (
        filteredTickets.map((ticket) => (

          <div key={ticket._id} className="ticket-card">

            <div className="ticket-header">
              <h4>{ticket.title}</h4>

              <span className={`priority ${ticket.priority}`}>
                {ticket.priority}
              </span>
            </div>

            <p>{ticket.description}</p>

            <p className="user-info">
              👤 {ticket.createdBy?.name} ({ticket.createdBy?.email})
            </p>

            {/* ✅ STATUS TEXT */}
            <p className={`status ${ticket.status}`}>
              Status: {
                ticket.status === "InProgress"
                  ? "In Progress"
                  : ticket.status
              }
            </p>

            {/* ✅ STATUS DROPDOWN */}
            <select
              value={ticket.status}
              onChange={(e) =>
                updateStatus(ticket._id, e.target.value)
              }
              className="status-dropdown"
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

          </div>

        ))
      )}

    </div>
  );
}

export default AdminDashboard;