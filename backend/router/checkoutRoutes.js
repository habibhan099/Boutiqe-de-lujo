const express = require("express");
const router = express.Router();
const { createCheckout } = require("../controller/checkoutController");

router.post("/", createCheckout);

module.exports = router;