const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} = require("../controller/categoryController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Category image must be an image file."));
    }
    return callback(null, true);
  },
});

function uploadCategoryImage(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (error) return res.status(400).json({ message: error.message });
    return next();
  });
}

router.get("/", listCategories);
router.post("/", uploadCategoryImage, createCategory);
router.put("/:id", uploadCategoryImage, updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;