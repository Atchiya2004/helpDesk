import React from "react";

function TicketList({ tickets }) {

  return (
    <div className="ticket-list">

      <h3>Your Tickets</h3>

      {tickets.length === 0 ? (
        <p className="no-ticket">No tickets yet</p>
      ) : (
        tickets.map(ticket => (

          <div key={ticket._id} className="ticket-card">

            <div className="ticket-header">
              <h4>{ticket.title}</h4>

              <span className={`priority ${ticket.priority}`}>
                {ticket.priority}
              </span>
            </div>

            <p>{ticket.description}</p>

            {/* ✅ STATUS */}
            <p className={`status ${ticket.status}`}>
              Status: {
                ticket.status === "InProgress"
                  ? "In Progress"
                  : ticket.status
              }
            </p>

          </div>

        ))
      )}

    </div>
  );
}

export default TicketList;