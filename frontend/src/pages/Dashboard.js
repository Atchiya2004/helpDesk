import React, { useEffect, useState } from "react";
import API from "../services/api";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";

function Dashboard() {

  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchTickets = async () => {
    try {
      const res = await API.get("/tickets/mytickets");
      setTickets(res.data);
    } catch (err) {
      alert("Error fetching tickets");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ✅ Priority Order
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  // ✅ Filter + Sort
  const filteredTickets = tickets
    .filter(ticket => {
      if (filter === "All") return true;
      return ticket.status === filter;
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="dashboard">

      <h2>User Dashboard</h2><br/>

      {/* ✅ FILTER BUTTONS */}
      <div className="filter-tabs">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
        <button onClick={() => setFilter("InProgress")}>In Progress</button>
        <button onClick={() => setFilter("Resolved")}>Resolved</button>
      </div>

      {/* ✅ CREATE TICKET */}
      <TicketForm fetchTickets={fetchTickets} />

      {/* ✅ SHOW TICKETS */}
      <TicketList tickets={filteredTickets} />

    </div>
  );
}

export default Dashboard;