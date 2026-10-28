const express = require("express");
const router = express.Router();

// Get all deliveries
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Deliveries fetched successfully",
    deliveries: [],
  });
});

// Register delivery person
router.post("/register", (req, res) => {
  res.status(201).json({
    message: "Delivery registration received",
    data: req.body,
  });
});

// Delivery person login
router.post("/login", (req, res) => {
  res.status(200).json({
    message: "Delivery login request received",
  });
});

// Confirm delivery
router.post("/confirm", (req, res) => {
  res.status(200).json({
    message: "Delivery confirmation received",
    data: req.body,
  });
});

// Update delivery status
router.patch("/status", (req, res) => {
  res.status(200).json({
    message: "Delivery status updated",
    data: req.body,
  });
});

module.exports = router;