const DeliveryConfirmation = require("../models/DeliveryConfirmation");
const { bodyIsObject, getText, invalidBody, invalidField } = require("./requestValidation");

const confirmationStatuses = new Set([
  "Delivered Successfully",
  "Customer Not Available",
  "Delivery Failed",
]);

function confirmDelivery(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const orderId = getText(req.body, "orderId");
  const customerName = getText(req.body, "customerName", 2);
  const deliveryDate = getText(req.body, "deliveryDate");
  if (!orderId) return invalidField(res, "orderId");
  if (!customerName) return invalidField(res, "customerName");
  if (!deliveryDate || Number.isNaN(Date.parse(deliveryDate))) {
    return invalidField(res, "deliveryDate");
  }
  if (!confirmationStatuses.has(req.body.confirmation)) {
    return invalidField(res, "confirmation");
  }

  const confirmation = DeliveryConfirmation.create({
    orderId,
    customerName,
    deliveryDate,
    confirmation: req.body.confirmation,
    remarks: typeof req.body.remarks === "string" ? req.body.remarks.trim() : "",
  });
  return res.status(201).json({ confirmation });
}

module.exports = { confirmDelivery };
