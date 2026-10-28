const Order = require("../models/Order");
const {
  bodyIsObject,
  getText,
  invalidBody,
  invalidField,
  phoneIsValid,
  positiveInteger,
} = require("./requestValidation");

async function createOrder(req, res) {
  try {
    if (!bodyIsObject(req.body)) return invalidBody(res);
    const productName = getText(req.body, "productName", 2);
    const size = getText(req.body, "size");
    const color = getText(req.body, "color", 2);
    const name = getText(req.body, "name", 2);
    const address = getText(req.body, "address", 5);
    if (!productName) return invalidField(res, "productName");
    if (!size) return invalidField(res, "size");
    if (!color) return invalidField(res, "color");
    if (!positiveInteger(req.body.quantity)) return invalidField(res, "quantity");
    if (!name) return invalidField(res, "name");
    if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
    if (!address) return invalidField(res, "address");

    const order = await Order.create({
      productName,
      size,
      color,
      quantity: req.body.quantity,
      customerName: name,
      phone: req.body.phone,
      address,
      status: "Pending",
    });
    return res.status(201).json({ order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createOrder };
