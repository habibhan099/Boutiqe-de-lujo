const { createInMemoryCollection } = require("./InMemoryCollection");

module.exports = createInMemoryCollection(["name", "email", "phone", "address"]);
