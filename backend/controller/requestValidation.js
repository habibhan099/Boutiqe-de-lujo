const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9]{7,15}$/;

function bodyIsObject(body) {
  return body !== null && typeof body === "object" && !Array.isArray(body);
}

function getText(source, field, minLength = 1) {
  if (typeof source[field] !== "string") return null;
  const value = source[field].trim();
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

function numberValue(value) {
  return typeof value === "string" && value.trim() !== "" ? Number(value) : value;
}

module.exports = {
  bodyIsObject,
  emailIsValid,
  getText,
  invalidBody,
  invalidField,
  numberValue,
  phoneIsValid,
  positiveInteger,
  positiveNumber,
};
