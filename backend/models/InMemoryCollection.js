const { randomUUID } = require("crypto");

function createInMemoryCollection(fields) {
  const records = new Map();
  const selectFields = (data) => Object.fromEntries(
    fields
      .filter((field) => Object.hasOwn(data, field))
      .map((field) => [field, data[field]]),
  );

  return {
    create(data, id = randomUUID()) {
      const record = {
        id,
        ...selectFields(data),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      records.set(id, record);
      return record;
    },
    findById(id) {
      return records.get(id) || null;
    },
    find(predicate) {
      return [...records.values()].filter(predicate);
    },
    findOne(predicate) {
      return [...records.values()].find(predicate) || null;
    },
    list() {
      return [...records.values()];
    },
    update(id, changes) {
      const current = records.get(id);
      if (!current) return null;
      const updated = {
        ...current,
        ...selectFields(changes),
        id: current.id,
        createdAt: current.createdAt,
        updatedAt: new Date().toISOString(),
      };
      records.set(id, updated);
      return updated;
    },
    delete(id) {
      const current = records.get(id);
      if (!current) return null;
      records.delete(id);
      return current;
    },
  };
}

module.exports = { createInMemoryCollection };
