const { authenticate, publicDeliveryPerson } = require("../models/DeliveryPerson");
const {
  bodyIsObject,
  getText,
  invalidBody,
  invalidField,
  phoneIsValid,
} = require("./requestValidation");

async function loginDeliveryPerson(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  if (!phoneIsValid(req.body.phone)) return invalidField(res, "phone");
  const password = getText(req.body, "password", 8);
  if (!password) return invalidField(res, "password");

  const person = await authenticate(req.body.phone, password);
  if (!person) return res.status(401).json({ message: "Invalid phone number or password." });
  return res.json({ deliveryPerson: publicDeliveryPerson(person) });
}

module.exports = { loginDeliveryPerson };
