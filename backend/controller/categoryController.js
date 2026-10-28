
const crypto = require("crypto");
const Category = require("../models/Category");

function imageReference(fileOrImage) {
  const storedData = fileOrImage.data || fileOrImage.buffer;
  const data = storedData?.buffer || storedData;
  return Buffer.isBuffer(data) || ArrayBuffer.isView(data)
    ? crypto.createHash("sha256").update(data).digest("hex")
    : undefined;
}

function imageRecord(file) {
  if (!file) return undefined;

  return {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
    data: file.buffer,
    reference: imageReference(file),
  };
}

function publicCategory(category) {
  if (!category) return category;

  const item = category.toObject ? category.toObject() : category;

  if (item.image) {
    item.image = {
      name: item.image.name,
      type: item.image.type,
      size: item.image.size,
      reference: item.image.reference || imageReference(item.image),
      data: item.image.data
        ? `data:${item.image.type};base64,${item.image.data.toString("base64")}`
        : undefined,
    };
  }

  return item;
}

function validateCategory(req, res) {
  const name =
    typeof req.body.name === "string" ? req.body.name.trim() : "";

  const description =
    typeof req.body.description === "string"
      ? req.body.description.trim()
      : "";

  if (name.length < 2) {
    res.status(400).json({
      message: "Category name must contain at least 2 characters.",
    });
    return null;
  }

  if (description.length < 5) {
    res.status(400).json({
      message: "Description must contain at least 5 characters.",
    });
    return null;
  }

  if (!req.params.id && !req.file) {
    res.status(400).json({
      message: "Category image is required.",
    });
    return null;
  }

  return {
    categoryId: typeof req.body.categoryId === "string" && req.body.categoryId.trim()
      ? req.body.categoryId.trim()
      : undefined,
    name,
    description,
  };
}

// GET all categories
async function listCategories(req, res) {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.json({
      categories: categories.map(publicCategory),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// CREATE category
async function createCategory(req, res) {
  try {
    const fields = validateCategory(req, res);
    if (!fields) return;

    const category = await Category.create({
      ...fields,
      image: imageRecord(req.file),
    });

    return res.status(201).json({
      category: publicCategory(category),
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = error.keyPattern?.categoryId
        ? "category ID"
        : "category name";
      return res.status(409).json({
        message: `This ${duplicateField} already exists.`,
      });
    }

    return res.status(500).json({ message: error.message });
  }
}

// UPDATE category
async function updateCategory(req, res) {
  try {
    const fields = validateCategory(req, res);
    if (!fields) return;

    const existing = await Category.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    const updateData = { ...fields };
    if (req.file) updateData.image = imageRecord(req.file);

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Replacing this embedded image is one atomic MongoDB update. An image
    // shared with another category remains referenced by that other record.

    return res.json({ category: publicCategory(category) });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = error.keyPattern?.categoryId
        ? "category ID"
        : "category name";
      return res.status(409).json({
        message: `This ${duplicateField} already exists.`,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    return res.status(500).json({ message: error.message });
  }
}

// DELETE category
async function deleteCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    if (category.image) {
      const reference = category.image.reference || imageReference(category.image);
      const shared = await Category.exists({
        _id: { $ne: category._id },
        $or: [
          { "image.reference": reference },
          { "image.data": category.image.data },
        ],
      });
      category.imageIsShared = Boolean(shared);
    }

    const deleted = await Category.findOneAndDelete({
      _id: category._id,
      ...(category.__v === undefined ? {} : { __v: category.__v }),
    });

    if (!deleted) {
      return res.status(409).json({
        message: "Category changed while it was being deleted. Please try again.",
      });
    }

    return res.json({
      message: "Category deleted successfully.",
      category: publicCategory(deleted),
      imageRemoved: Boolean(deleted.image && !category.imageIsShared),
      imagePreserved: Boolean(deleted.image && category.imageIsShared),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid category ID." });
    }

    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
};
