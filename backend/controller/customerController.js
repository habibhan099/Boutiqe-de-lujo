
const { createCustomer } = require("../models/Customer");
const {
  bodyIsObject,
  emailIsValid,
  getText,
  invalidBody,
  invalidField,
} = require("./requestValidation");

const registerCustomer = async (req, res) => {
  try {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const name = getText(req.body, "name", 2);
  const email = getText(req.body, "email");
  const phone = getText(req.body, "phone", 8);
  const password = getText(req.body, "password", 8);
  const address = getText(req.body, "address", 5);
  if (!name) return invalidField(res, "name");
  if (!email || !emailIsValid(email)) return invalidField(res, "email");
  if (!phone) return invalidField(res, "phone");
  if (!password) return invalidField(res, "password");
  if (!address) return invalidField(res, "address");

  const customer = await createCustomer(
    name,
    email,
    phone,
    password,
    address
  );

    return res.status(201).json({
      message: "Customer registered successfully",
      customer,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A customer with this email or ID already exists." });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerCustomer };
