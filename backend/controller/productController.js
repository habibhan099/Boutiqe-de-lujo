
const Product = require("../models/Product");
const {
  bodyIsObject,
  getText,
  invalidBody,
  invalidField,
  numberValue,
  positiveNumber,
} = require("./requestValidation");

const productCategories = new Set(["Men", "Women", "Kids"]);

function imageRecord(file) {
  if (!file) return undefined;

  return {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
    data: file.buffer,
  };
}

function publicProduct(product) {
  if (!product) return product;

  const item = product.toObject ? product.toObject() : product;
  const { image, ...fields } = item;

  return {
    ...fields,
    image: image
      ? {
          name: image.name,
          type: image.type,
          size: image.size,
          url: image.data
            ? `data:${image.type};base64,${image.data.toString("base64")}`
            : undefined,
        }
      : undefined,
  };
}

function validateProduct(req, res) {
  if (!bodyIsObject(req.body)) {
    invalidBody(res);
    return null;
  }

  const name = getText(req.body, "name", 2);
  const description = getText(req.body, "description", 5);
  const price = numberValue(req.body.price);

  if (!name) {
    invalidField(res, "name");
    return null;
  }

  if (!description) {
    invalidField(res, "description");
    return null;
  }

  if (!positiveNumber(price)) {
    invalidField(res, "price");
    return null;
  }

  if (!productCategories.has(req.body.category)) {
    invalidField(res, "category");
    return null;
  }

  return {
    productId: typeof req.body.productId === "string" && req.body.productId.trim()
      ? req.body.productId.trim()
      : undefined,
    name,
    price,
    category: req.body.category,
    description,
  };
}

async function listProducts(req, res) {
  const products = await Product.find().sort({ createdAt: -1 });

  return res.json({
    products: products.map(publicProduct),
  });
}

async function createProduct(req, res) {
  try {
    const fields = validateProduct(req, res);
    if (!fields) return;

    const product = await Product.create({
      ...fields,
      image: imageRecord(req.file),
    });

    return res.status(201).json({
      product: publicProduct(product),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This product ID already exists." });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const fields = validateProduct(req, res);
    if (!fields) return;

    const updates = {
      ...fields,
    };

    if (req.file) {
      updates.image = imageRecord(req.file);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    return res.json({
      product: publicProduct(product),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This product ID already exists." });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID." });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    return res.json({
      product: publicProduct(product),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID." });
    }
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
};
