const express = require("express");
const router = express.Router();
const { updateDeliveryStatus } = require("../controller/deliveryStatusController");

router.patch("/", updateDeliveryStatus);

module.exports = router;