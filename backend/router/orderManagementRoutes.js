const express = require("express");
const router = express.Router();
const {
  createOrder,
  deleteOrder,
  getOrder,
  listOrders,
  updateOrder,
} = require("../controller/orderManagementController");

router.post("/management", createOrder);
router.get("/", listOrders);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;