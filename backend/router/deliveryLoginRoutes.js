const express = require("express");
const router = express.Router();
const { loginDeliveryPerson } = require("../controller/deliveryLoginController");

router.post("/", loginDeliveryPerson);

module.exports = router;