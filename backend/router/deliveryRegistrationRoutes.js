
const express = require("express");
const router = express.Router();
const { registerDeliveryPerson } = require("../controller/deliveryPersonController");

router.post("/register", (req, res, next) => {
  if (typeof req.body?.password === "string" || typeof req.body?.cnic === "string") {
    return registerDeliveryPerson(req, res);
  }
  return next("router");
});

module.exports = router;
