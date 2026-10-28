const { authenticateByEmail } = require("../models/Customer");
const {
  bodyIsObject,
  emailIsValid,
  getText,
  invalidBody,
  invalidField,
} = require("./requestValidation");

async function loginCustomer(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  if (!emailIsValid(req.body.email)) return invalidField(res, "email");
  const password = getText(req.body, "password", 8);
  if (!password) return invalidField(res, "password");
  const customer = await authenticateByEmail(req.body.email, password);
  if (!customer) return res.status(401).json({ message: "Invalid email or password." });
  return res.json({ customer });
}

module.exports = { loginCustomer };
