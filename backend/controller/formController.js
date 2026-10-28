const Category = require("../models/Category");
const Checkout = require("../models/Checkout");
const CustomerContact = require("../models/CustomerContact");
const DeliveryConfirmation = require("../models/DeliveryConfirmation");
const DeliveryPerson = require("../models/DeliveryPerson");
const DeliveryStatus = require("../models/DeliveryStatus");
const NewsletterSubscription = require("../models/NewsletterSubscription");
const Order = require("../models/Order");
const Product = require("../models/Product");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9]{7,15}$/;
const productCategories = new Set(["Men", "Women", "Kids"]);
const deliveryStatuses = new Set(["Available", "Busy", "Offline"]);
const orderStatuses = new Set(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]);
const deliveryUpdateStatuses = new Set([
  "Assigned",
  "Picked Up",
  "Out for Delivery",
  "Delivered",
  "Failed",
]);
const confirmationStatuses = new Set([
  "Delivered Successfully",
  "Customer Not Available",
  "Delivery Failed",
]);

function bodyIsObject(body) {
  return body !== null && typeof body === "object" && !Array.isArray(body);
}

function getText(body, field, minLength = 1) {
  if (typeof body[field] !== "string") return null;
  const value = body[field].trim();
  return value.length >= minLength ? value : null;
}

function invalidBody(res) {
  return res.status(400).json({ message: "A valid request body is required." });
}

function invalidField(res, field) {
  return res.status(400).json({ message: `${field} is invalid or missing.` });
}

function emailIsValid(email) {
  return typeof email === "string" && emailPattern.test(email);
}

function phoneIsValid(phone) {
  return typeof phone === "string" && phonePattern.test(phone);
}

function positiveNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function positiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function imageRecord(file) {
  if (!file) return undefined;
  return {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
    data: file.buffer,
  };
}

function publicProduct(product) {
  if (!product) return product;
  const { image, ...fields } = product;
  return { ...fields, image: image && { name: image.name, type: image.type, size: image.size } };
}

function publicCategory(category) {
  if (!category) return category;
  const { image, ...fields } = category;
  return { ...fields, image: image && { name: image.name, type: image.type, size: image.size } };
}

function publicDeliveryPerson(person) {
  if (!person) return person;
  const { passwordHash, passwordSalt, ...publicFields } = person;
  return publicFields;
}

function validProductFields(body, res) {
  const name = getText(body, "name", 2);
  const description = getText(body, "description", 5);
  const price = typeof body.price === "string" && body.price.trim() !== ""
    ? Number(body.price)
    : body.price;
  if (!name) {
    invalidField(res, "name");
    return null;
  }
  if (!description) {
    invalidField(res, "description");
    return null;
  }
  if (!positiveNumber(price)) {
    invalidField(res, "price");
    return null;
  }
  if (!productCategories.has(body.category)) {
    invalidField(res, "category");
    return null;
  }
  return { name, description, price, category: body.category };
}

function validCategoryFields(body, res) {
  const name = getText(body, "name", 2);
  const description = getText(body, "description", 5);
  if (!name) {
    invalidField(res, "name");
    return null;
  }
  if (!description) {
    invalidField(res, "description");
    return null;
  }
  return { name, description };
}

function listCategories(req, res) {
  res.json({ categories: Category.list().map(publicCategory) });
}

function createCategory(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const fields = validCategoryFields(req.body, res);
  if (!fields) return;
  const category = Category.create({ ...fields, image: imageRecord(req.file) });
  return res.status(201).json({ category: publicCategory(category) });
}

function updateCategory(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const fields = validCategoryFields(req.body, res);
  if (!fields) return;
  const category = Category.update(req.params.id, {
    ...fields,
    ...(req.file ? { image: imageRecord(req.file) } : {}),
  });
  if (!category) return res.status(404).json({ message: "Category not found." });
  return res.json({ category: publicCategory(category) });
}

function deleteCategory(req, res) {
  const category = Category.delete(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found." });
  return res.json({ category: publicCategory(category) });
}

function listProducts(req, res) {
  res.json({ products: Product.list().map(publicProduct) });
}

function createProduct(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const fields = validProductFields(req.body, res);
  if (!fields) return;
  const product = Product.create({ ...fields, image: imageRecord(req.file) });
  return res.status(201).json({ product: publicProduct(product) });
}

function updateProduct(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const fields = validProductFields(req.body, res);
  if (!fields) return;
  const product = Product.update(req.params.id, {
    ...fields,
    ...(req.file ? { image: imageRecord(req.file) } : {}),
  });
  if (!product) return res.status(404).json({ message: "Product not found." });
  return res.json({ product: publicProduct(product) });
}

function deleteProduct(req, res) {
  const product = Product.delete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  return res.json({ product: publicProduct(product) });
}

function searchProducts(req, res) {
  const query = getText(req.query, "query", 2);
  if (!query) return invalidField(res, "query");
  return res.json({ products: Product.search(query).map(publicProduct) });
}

function createOrder(req, res) {
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

  const order = Order.create({
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
}

function listOrders(req, res) {
  res.json({ orders: Order.list() });
}

function getOrder(req, res) {
  const order = Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found." });
  return res.json({ order });
}

function updateOrder(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const customerName = getText(req.body, "customerName", 2);
  const productName = getText(req.body, "productName", 2);
  if (!customerName) return invalidField(res, "customerName");
  if (!productName) return invalidField(res, "productName");
  if (!positiveInteger(req.body.quantity)) return invalidField(res, "quantity");
  if (!positiveNumber(req.body.total)) return invalidField(res, "total");
  if (!orderStatuses.has(req.body.status)) return invalidField(res, "status");

  const order = Order.update(req.params.id, {
    customerName,
    productName,
    quantity: req.body.quantity,
    total: req.body.total,
    status: req.body.status,
  });
  if (!order) return res.status(404).json({ message: "Order not found." });
  return res.json({ order });
}

function listDeliveries(req, res) {
  res.json({ deliveries: DeliveryPerson.list().map(publicDeliveryPerson) });
}

function createDeliveryPerson(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);

  const name = getText(req.body, "name", 2);
  const address = getText(req.body, "address", 5);
  if (!name) return invalidField(res, "name");
  if (!emailIsValid(req.body.email)) return invalidField(res, "email");
  if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
  if (!address) return invalidField(res, "address");

  if (req.body.password !== undefined || req.body.cnic !== undefined) {
    const password = getText(req.body, "password", 8);
    const cnic = getText(req.body, "cnic", 5);
    if (!password) return invalidField(res, "password");
    if (!cnic) return invalidField(res, "cnic");
    if (DeliveryPerson.findOne((person) => person.phone === req.body.phone)) {
      return res.status(409).json({ message: "A delivery person with this phone already exists." });
    }
    const person = DeliveryPerson.createRegistered({
      name,
      email: req.body.email.trim(),
      phone: req.body.phone,
      address,
      cnic,
      password,
      status: "Available",
    });
    return res.status(201).json({ deliveryPerson: publicDeliveryPerson(person) });
  }

  if (!deliveryStatuses.has(req.body.status)) return invalidField(res, "status");
  const person = DeliveryPerson.create({
    name,
    email: req.body.email.trim(),
    phone: req.body.phone,
    address,
    status: req.body.status,
  });
  return res.status(201).json({ deliveryPerson: publicDeliveryPerson(person) });
}

function loginDeliveryPerson(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
  const password = getText(req.body, "password", 8);
  if (!password) return invalidField(res, "password");
  const person = DeliveryPerson.authenticate(req.body.phone, password);
  if (!person) return res.status(401).json({ message: "Invalid phone number or password." });
  return res.json({ deliveryPerson: publicDeliveryPerson(person) });
}

function createCheckout(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const name = getText(req.body, "name", 2);
  const address = getText(req.body, "address", 5);
  if (!name) return invalidField(res, "name");
  if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
  if (!address) return invalidField(res, "address");
  if (!new Set(["Cash on Delivery", "Online Payment"]).has(req.body.paymentMethod)) {
    return invalidField(res, "paymentMethod");
  }

  const checkout = Checkout.create({
    name,
    phone: req.body.phone,
    address,
    paymentMethod: req.body.paymentMethod,
  });
  return res.status(201).json({ checkout });
}

function listCustomers(req, res) {
  res.json({ customers: CustomerContact.list() });
}

function getCustomer(req, res) {
  const customer = CustomerContact.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found." });
  return res.json({ customer });
}

function createCustomerContact(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const name = getText(req.body, "name", 2);
  const address = getText(req.body, "address", 5);
  if (!name) return invalidField(res, "name");
  if (!emailIsValid(req.body.email)) return invalidField(res, "email");
  if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
  if (!address) return invalidField(res, "address");

  const customer = CustomerContact.create({
    name,
    email: req.body.email.trim().toLowerCase(),
    phone: req.body.phone,
    address,
  });
  return res.status(201).json({ customer });
}

function createDeliveryConfirmation(req, res) {
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

function updateDeliveryStatus(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const orderId = getText(req.body, "orderId");
  const customerName = getText(req.body, "customerName", 2);
  if (!orderId) return invalidField(res, "orderId");
  if (!customerName) return invalidField(res, "customerName");
  if (!deliveryUpdateStatuses.has(req.body.status)) return invalidField(res, "status");

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

function subscribeNewsletter(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  if (!emailIsValid(req.body.email)) return invalidField(res, "email");
  const email = req.body.email.trim().toLowerCase();
  if (NewsletterSubscription.findOne((subscription) => subscription.email === email)) {
    return res.status(409).json({ message: "This email is already subscribed." });
  }
  const subscription = NewsletterSubscription.create({ email });
  return res.status(201).json({ subscription });
}

function loginAdmin(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  if (!emailIsValid(req.body.email)) return invalidField(res, "email");
  if (!getText(req.body, "password", 8)) return invalidField(res, "password");
  return res.status(503).json({ message: "Admin credentials are not configured." });
}

function loginCustomer(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  if (!emailIsValid(req.body.email)) return invalidField(res, "email");
  if (!getText(req.body, "password", 8)) return invalidField(res, "password");
  return res.status(503).json({ message: "Customer authentication is not configured without persistent customer records." });
}

module.exports = {
  createCategory,
  createCheckout,
  createCustomerContact,
  createDeliveryConfirmation,
  createDeliveryPerson,
  createOrder,
  createProduct,
  deleteCategory,
  deleteProduct,
  getCustomer,
  getOrder,
  listCategories,
  listCustomers,
  listDeliveries,
  listOrders,
  listProducts,
  loginAdmin,
  loginCustomer,
  loginDeliveryPerson,
  searchProducts,
  subscribeNewsletter,
  updateCategory,
  updateDeliveryStatus,
  updateOrder,
  updateProduct,
};
