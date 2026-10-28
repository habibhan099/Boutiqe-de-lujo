const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");
const { createInMemoryCollection } = require("./InMemoryCollection");

const accounts = createInMemoryCollection(["email", "passwordHash", "passwordSalt"]);

function createAdminAccount(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordSalt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(password, passwordSalt, 64).toString("hex");
  return accounts.create({
    email: normalizedEmail,
    passwordHash,
    passwordSalt,
  });
}

function authenticate(email, password) {
  const account = accounts.findOne(
    (record) => record.email === email.trim().toLowerCase(),
  );
  if (!account) return null;

  const expected = Buffer.from(account.passwordHash, "hex");
  const actual = scryptSync(password, account.passwordSalt, 64);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }
  return { id: account.id, email: account.email };
}

module.exports = {
  authenticate,
  createAdminAccount,
  list: accounts.list,
};
