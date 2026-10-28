const Product = require("../models/Product");
const { getText, invalidField } = require("./requestValidation");

function searchProducts(req, res) {
  const query = getText(req.query, "query", 2);
  if (!query) return invalidField(res, "query");
  const products = Product.search(query).map((product) => {
    const { image, ...fields } = product;
    return {
      ...fields,
      image: image && { name: image.name, type: image.type, size: image.size },
    };
  });
  return res.json({ products });
}

module.exports = { searchProducts };
