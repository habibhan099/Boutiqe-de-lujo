const { Customer, publicCustomer } = require("../models/Customer");
const {
  bodyIsObject,
  emailIsValid,
  getText,
  invalidBody,
  invalidField,
  phoneIsValid,
} = require("./requestValidation");

async function listCustomers(req, res) {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    return res.json({ customers: customers.map(publicCustomer) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getCustomer(req, res) {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found." });
    return res.json({ customer: publicCustomer(customer) });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid customer ID." });
    return res.status(500).json({ message: error.message });
  }
}

async function createCustomerContact(req, res) {
  try {
    if (!bodyIsObject(req.body)) return invalidBody(res);
    const customerId = getText(req.body, "customerId", 1);
    const name = getText(req.body, "name", 2);
    const address = getText(req.body, "address", 5);
    if (!name) return invalidField(res, "name");
    if (!emailIsValid(req.body.email)) return invalidField(res, "email");
    if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
    if (!address) return invalidField(res, "address");

    const customer = await Customer.create({
      customerId: customerId || undefined,
      name,
      email: req.body.email.trim().toLowerCase(),
      phone: req.body.phone,
      address,
    });
    return res.status(201).json({ customer: publicCustomer(customer) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "A customer with this email or ID already exists." });
    return res.status(500).json({ message: error.message });
  }
}

async function updateCustomer(req, res) {
  try {
    if (!bodyIsObject(req.body)) return invalidBody(res);
    const customerId = getText(req.body, "customerId", 1);
    const name = getText(req.body, "name", 2);
    const address = getText(req.body, "address", 5);
    if (!customerId) return invalidField(res, "customerId");
    if (!name) return invalidField(res, "name");
    if (!emailIsValid(req.body.email)) return invalidField(res, "email");
    if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
    if (!address) return invalidField(res, "address");

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { customerId, name, email: req.body.email.trim().toLowerCase(), phone: req.body.phone, address },
      { new: true, runValidators: true }
    );
    if (!customer) return res.status(404).json({ message: "Customer not found." });
    return res.json({ customer: publicCustomer(customer) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "A customer with this email or ID already exists." });
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid customer ID." });
    return res.status(500).json({ message: error.message });
  }
}

async function deleteCustomer(req, res) {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found." });
    return res.json({ customer: publicCustomer(customer) });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid customer ID." });
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createCustomerContact, deleteCustomer, getCustomer, listCustomers, updateCustomer };
