const express = require("express");
const router = express.Router();
const { subscribeNewsletter } = require("../controller/newsletterController");

router.post("/", subscribeNewsletter);

module.exports = router;