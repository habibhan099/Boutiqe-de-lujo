const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} = require("../controller/productController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Product image must be an image file."));
    }
    return callback(null, true);
  },
});

function uploadProductImage(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (error) return res.status(400).json({ message: error.message });
    return next();
  });
}

router.get("/", listProducts);
router.post("/", uploadProductImage, createProduct);
router.put("/:id", uploadProductImage, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;