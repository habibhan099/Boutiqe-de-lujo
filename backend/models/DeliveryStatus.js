const { createInMemoryCollection } = require("./InMemoryCollection");

module.exports = createInMemoryCollection([
  "orderId",
  "customerName",
  "status",
  "notes",
]);
