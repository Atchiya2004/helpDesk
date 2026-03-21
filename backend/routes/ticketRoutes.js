const express = require("express");
const Ticket = require("../models/Ticket");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

/* CREATE TICKET */
router.post("/", protect, async (req, res) => {

  const { title, description, priority } = req.body;

  // ✅ Backend validation
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const ticket = await Ticket.create({
      title,
      description,
      priority,
      createdBy: req.user._id
    });

    res.status(201).json(ticket);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* USER → SEE ONLY OWN TICKETS */
router.get("/mytickets", protect, async (req, res) => {

  try {
    const tickets = await Ticket.find({
      createdBy: req.user._id
    });

    res.json(tickets);

  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
});

/* ADMIN → SEE ALL TICKETS */
router.get("/all", protect, admin, async (req, res) => {

  try {
    const tickets = await Ticket.find()
      .populate("createdBy", "name email");

    res.json(tickets);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ADMIN UPDATE STATUS */
router.put("/:id", protect, admin, async (req, res) => {

  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = req.body.status || ticket.status;

    const updated = await ticket.save();

    res.json(updated);

  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }

});

module.exports = router;