const express = require("express");
const router = express.Router();
const { loginCustomer } = require("../controller/customerLoginController");

router.post("/", loginCustomer);

module.exports = router;