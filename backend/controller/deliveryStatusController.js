const DeliveryStatus = require("../models/DeliveryStatus");
const {
  bodyIsObject,
  getText,
  invalidBody,
  invalidField,
} = require("./requestValidation");

const deliveryStatuses = new Set([
  "Assigned",
  "Picked Up",
  "Out for Delivery",
  "Delivered",
  "Failed",
]);

function updateDeliveryStatus(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const orderId = getText(req.body, "orderId");
  const customerName = getText(req.body, "customerName", 2);
  if (!orderId) return invalidField(res, "orderId");
  if (!customerName) return invalidField(res, "customerName");
  if (!deliveryStatuses.has(req.body.status)) return invalidField(res, "status");

  const changes = {
    orderId,
    customerName,
    status: req.body.status,
    notes: typeof req.body.notes === "string" ? req.body.notes.trim() : "",
  };
  const existing = DeliveryStatus.findById(orderId);
  const deliveryStatus = existing
    ? DeliveryStatus.update(orderId, changes)
    : DeliveryStatus.create(changes, orderId);
  return res.json({ deliveryStatus });
}

module.exports = { updateDeliveryStatus };
