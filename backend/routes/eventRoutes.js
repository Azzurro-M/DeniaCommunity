const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createEvent,
} = require("../controllers/eventController.js");

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.post("/new", createEvent);
router.delete("/delete/:id", deleteEvent);

module.exports = router;
