const AdminAccount = require("../models/AdminAccount");
const {
  bodyIsObject,
  emailIsValid,
  getText,
  invalidBody,
  invalidField,
} = require("./requestValidation");

function loginAdmin(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  const email = getText(req.body, "email");
  const password = getText(req.body, "password", 8);
  if (!email || !emailIsValid(email)) return invalidField(res, "email");
  if (!password) return invalidField(res, "password");

  if (AdminAccount.list().length === 0) {
    return res.status(503).json({ message: "Admin credentials are not configured." });
  }
  const admin = AdminAccount.authenticate(email, password);
  if (!admin) return res.status(401).json({ message: "Invalid email or password." });
  return res.json({ admin });
}

module.exports = { loginAdmin };
