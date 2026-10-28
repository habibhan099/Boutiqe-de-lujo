const { createInMemoryCollection } = require("./InMemoryCollection");

module.exports = createInMemoryCollection([
  "name",
  "phone",
  "address",
  "paymentMethod",
]);
