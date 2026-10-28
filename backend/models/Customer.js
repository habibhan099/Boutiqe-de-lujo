
const mongoose = require("mongoose");
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");

const customerSchema = new mongoose.Schema(
  {
    customerId: { type: String, trim: true, unique: true, sparse: true },
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true, minlength: 5 },
    passwordHash: String,
    passwordSalt: String,
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

async function createCustomer(name, email, phone, password, address, customerId) {
  const passwordSalt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(password, passwordSalt, 64).toString("hex");
  const customer = await Customer.create({
    customerId,
    name,
    email: email.trim().toLowerCase(),
    phone,
    address,
    passwordHash,
    passwordSalt,
  });
  return publicCustomer(customer);
}

async function authenticateByEmail(email, password) {
  const customer = await Customer.findOne({
    email: email.trim().toLowerCase(),
  });
  if (!customer || !customer.passwordHash || !customer.passwordSalt) return null;

  const expected = Buffer.from(customer.passwordHash, "hex");
  const actual = scryptSync(password, customer.passwordSalt, 64);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }
  return publicCustomer(customer);
}

function publicCustomer(customer) {
  const item = customer.toObject ? customer.toObject() : customer;
  const { passwordHash, passwordSalt, ...profile } = item;
  return profile;
}

module.exports = {
  authenticateByEmail,
  createCustomer,
  publicCustomer,
  Customer,
};
