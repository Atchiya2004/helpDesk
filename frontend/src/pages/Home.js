import React from "react";

function Home() {
  return (
    <div className="home-container">

      <div className="home-hero">
        <h1>HelpDesk Ticketing System</h1>
        <p>
          A smart platform to manage, track, and resolve support tickets efficiently.
        </p>
      </div>

      <div className="home-features">

        <div className="feature-card">
          <h3>🎫 Create Tickets</h3>
          <p>Easily raise issues and track their progress in real-time.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Track Status</h3>
          <p>Monitor ticket status: Pending, In Progress, and Resolved.</p>
        </div>

        <div className="feature-card">
          <h3>👨‍💼 Admin Control</h3>
          <p>Admins can manage and update all tickets efficiently.</p>
        </div>

      </div>

    </div>
  );
}

export default Home;