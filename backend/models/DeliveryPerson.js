const mongoose = require("mongoose");
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");

const deliveryPersonSchema = new mongoose.Schema(
  {
    deliveryId: { type: String, trim: true, unique: true, sparse: true },
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String, required: true, trim: true, unique: true },
    passwordHash: String,
    passwordSalt: String,
    address: { type: String, required: true, trim: true, minlength: 5 },
    cnic: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["Available", "Busy", "Offline"],
      default: "Available",
    },
  },
  { timestamps: true }
);

const DeliveryPerson = mongoose.model("DeliveryPerson", deliveryPersonSchema);

async function createRegistered(data) {
  const passwordSalt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(data.password, passwordSalt, 64).toString("hex");
  const { password, ...profile } = data;
  return DeliveryPerson.create({ ...profile, passwordHash, passwordSalt });
}

async function authenticate(phone, password) {
  const deliveryPerson = await DeliveryPerson.findOne({ phone });
  if (!deliveryPerson?.passwordHash || !deliveryPerson.passwordSalt) return null;

  const expected = Buffer.from(deliveryPerson.passwordHash, "hex");
  const actual = scryptSync(password, deliveryPerson.passwordSalt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual)
    ? deliveryPerson
    : null;
}

function publicDeliveryPerson(person) {
  const item = person.toObject ? person.toObject() : person;
  const { passwordHash, passwordSalt, ...profile } = item;
  return profile;
}

module.exports = {
  DeliveryPerson,
  authenticate,
  createRegistered,
  publicDeliveryPerson,
};
