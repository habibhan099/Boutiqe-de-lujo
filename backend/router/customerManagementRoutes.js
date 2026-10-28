const express = require("express");
const router = express.Router();
const {
  createCustomerContact,
  deleteCustomer,
  getCustomer,
  listCustomers,
  updateCustomer,
} = require("../controller/customerContactController");

router.get("/", listCustomers);
router.get("/:id", getCustomer);
router.post("/", createCustomerContact);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.post("/register", (req, res, next) => {
  if (typeof req.body?.password === "string") return next("router");
  return createCustomerContact(req, res);
});

module.exports = router;