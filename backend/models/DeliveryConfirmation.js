const { createInMemoryCollection } = require("./InMemoryCollection");

module.exports = createInMemoryCollection([
  "orderId",
  "customerName",
  "deliveryDate",
  "confirmation",
  "remarks",
]);
