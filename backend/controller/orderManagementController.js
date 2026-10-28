const Order = require("../models/Order");
const {
  bodyIsObject,
  getText,
  invalidBody,
  invalidField,
  numberValue,
  positiveInteger,
  positiveNumber,
} = require("./requestValidation");

const orderStatuses = new Set(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]);

async function createOrder(req, res) {
  try {
    if (!bodyIsObject(req.body)) return invalidBody(res);
    const orderId = getText(req.body, "orderId", 1);
    const customerName = getText(req.body, "customerName", 2);
    const productName = getText(req.body, "productName", 2);
    const quantity = numberValue(req.body.quantity);
    const total = numberValue(req.body.total);
    if (!orderId) return invalidField(res, "orderId");
    if (!customerName) return invalidField(res, "customerName");
    if (!productName) return invalidField(res, "productName");
    if (!positiveInteger(quantity)) return invalidField(res, "quantity");
    if (!positiveNumber(total)) return invalidField(res, "total");
    if (!orderStatuses.has(req.body.status)) return invalidField(res, "status");

    const order = await Order.create({
      orderId,
      customerName,
      productName,
      quantity,
      total,
      status: req.body.status,
    });
    return res.status(201).json({ order });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This order ID already exists." });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function listOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    return res.json({ order });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid order ID." });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function updateOrder(req, res) {
  try {
    if (!bodyIsObject(req.body)) return invalidBody(res);
    const orderId = getText(req.body, "orderId", 1);
    const customerName = getText(req.body, "customerName", 2);
    const productName = getText(req.body, "productName", 2);
    const quantity = numberValue(req.body.quantity);
    const total = numberValue(req.body.total);
    if (!orderId) return invalidField(res, "orderId");
    if (!customerName) return invalidField(res, "customerName");
    if (!productName) return invalidField(res, "productName");
    if (!positiveInteger(quantity)) return invalidField(res, "quantity");
    if (!positiveNumber(total)) return invalidField(res, "total");
    if (!orderStatuses.has(req.body.status)) return invalidField(res, "status");

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderId, customerName, productName, quantity, total, status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found." });
    return res.json({ order });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This order ID already exists." });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid order ID." });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    return res.json({ order });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid order ID." });
    }
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createOrder, deleteOrder, getOrder, listOrders, updateOrder };
