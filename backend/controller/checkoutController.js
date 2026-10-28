const Checkout = require("../models/Checkout");
const {
  bodyIsObject,
  getText,
  invalidBody,
  invalidField,
  phoneIsValid,
} = require("./requestValidation");

const paymentMethods = new Set(["Cash on Delivery", "Online Payment"]);

function createCheckout(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const name = getText(req.body, "name", 2);
  const address = getText(req.body, "address", 5);
  if (!name) return invalidField(res, "name");
  if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
  if (!address) return invalidField(res, "address");
  if (!paymentMethods.has(req.body.paymentMethod)) return invalidField(res, "paymentMethod");

  const checkout = Checkout.create({
    name,
    phone: req.body.phone,
    address,
    paymentMethod: req.body.paymentMethod,
  });
  return res.status(201).json({ checkout });
}

module.exports = { createCheckout };
