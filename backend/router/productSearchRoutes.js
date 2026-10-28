const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controller/productSearchController");

router.get("/", searchProducts);

module.exports = router;