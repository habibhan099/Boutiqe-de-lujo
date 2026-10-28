const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Categories fetched" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Category created", data: req.body });
});

router.put("/:id", (req, res) => {
  res.json({ message: "Category updated", id: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Category deleted", id: req.params.id });
});

module.exports = router;