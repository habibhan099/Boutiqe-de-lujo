const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.status(200).json({
    message: "Admin login request received",
    data: req.body,
  });
});

module.exports = router;