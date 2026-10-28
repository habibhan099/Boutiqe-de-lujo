const express = require("express");
const router = express.Router();
const {
  createDeliveryPerson,
  deleteDelivery,
  getDelivery,
  listDeliveries,
  updateDelivery,
} = require("../controller/deliveryPersonController");

router.get("/", listDeliveries);
router.get("/:id", getDelivery);
router.post("/", createDeliveryPerson);
router.put("/:id", updateDelivery);
router.delete("/:id", deleteDelivery);

module.exports = router;