const {
  DeliveryPerson,
  createRegistered,
  publicDeliveryPerson,
} = require("../models/DeliveryPerson");
const {
  bodyIsObject,
  emailIsValid,
  getText,
  invalidBody,
  invalidField,
  phoneIsValid,
} = require("./requestValidation");

const deliveryStatuses = new Set(["Available", "Busy", "Offline"]);

function validateProfile(body, res) {
  const name = getText(body, "name", 2);
  const address = getText(body, "address", 5);
  if (!name) return invalidField(res, "name");
  if (!emailIsValid(body.email)) return invalidField(res, "email");
  if (!phoneIsValid(body.phone)) return invalidField(res, "phone");
  if (!address) return invalidField(res, "address");
  return { name, email: body.email.trim().toLowerCase(), phone: body.phone.trim(), address };
}

async function listDeliveries(req, res) {
  try {
    const deliveries = await DeliveryPerson.find().sort({ createdAt: -1 });
    return res.json({ deliveries: deliveries.map(publicDeliveryPerson) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getDelivery(req, res) {
  try {
    const person = await DeliveryPerson.findById(req.params.id);
    if (!person) return res.status(404).json({ message: "Delivery person not found." });
    return res.json({ deliveryPerson: publicDeliveryPerson(person) });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid delivery person ID." });
    return res.status(500).json({ message: error.message });
  }
}

async function createDeliveryPerson(req, res) {
  try {
    if (!bodyIsObject(req.body)) return invalidBody(res);
    const profile = validateProfile(req.body, res);
    if (!profile) return;
    if (!deliveryStatuses.has(req.body.status)) return invalidField(res, "status");
    const deliveryId = getText(req.body, "deliveryId", 1);
    const person = await DeliveryPerson.create({
      ...profile,
      deliveryId: deliveryId || undefined,
      status: req.body.status,
    });
    return res.status(201).json({ deliveryPerson: publicDeliveryPerson(person) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "A delivery person with this email, phone, or ID already exists." });
    if (error.name === "ValidationError") return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: error.message });
  }
}

async function updateDelivery(req, res) {
  try {
    if (!bodyIsObject(req.body)) return invalidBody(res);
    const profile = validateProfile(req.body, res);
    if (!profile) return;
    if (!deliveryStatuses.has(req.body.status)) return invalidField(res, "status");
    const deliveryId = getText(req.body, "deliveryId", 1);
    if (!deliveryId) return invalidField(res, "deliveryId");
    const person = await DeliveryPerson.findByIdAndUpdate(
      req.params.id,
      { ...profile, deliveryId, status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!person) return res.status(404).json({ message: "Delivery person not found." });
    return res.json({ deliveryPerson: publicDeliveryPerson(person) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "A delivery person with this email, phone, or ID already exists." });
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid delivery person ID." });
    if (error.name === "ValidationError") return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: error.message });
  }
}

async function deleteDelivery(req, res) {
  try {
    const person = await DeliveryPerson.findByIdAndDelete(req.params.id);
    if (!person) return res.status(404).json({ message: "Delivery person not found." });
    return res.json({ deliveryPerson: publicDeliveryPerson(person) });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid delivery person ID." });
    return res.status(500).json({ message: error.message });
  }
}

async function registerDeliveryPerson(req, res) {
  try {
    if (!bodyIsObject(req.body)) return invalidBody(res);
    const profile = validateProfile(req.body, res);
    if (!profile) return;
    const password = getText(req.body, "password", 8);
    const cnic = getText(req.body, "cnic", 5);
    if (!password) return invalidField(res, "password");
    if (!cnic) return invalidField(res, "cnic");
    const person = await createRegistered({
      ...profile,
      cnic,
      password,
      status: "Available",
    });
    return res.status(201).json({ deliveryPerson: publicDeliveryPerson(person) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "A delivery person with this email or phone already exists." });
    if (error.name === "ValidationError") return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createDeliveryPerson,
  deleteDelivery,
  getDelivery,
  listDeliveries,
  registerDeliveryPerson,
  updateDelivery,
};
