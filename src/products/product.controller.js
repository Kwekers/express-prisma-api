const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
  handleUpdateProduct,
} = require("./product.service");
const { tryCatch } = require("../utils/tryCatch");
const errorHandler = require("../middleware/errorHandler");

const router = express.Router();

// GET all products
router.get("/", tryCatch(async (req, res) => {
  const products = await getAllProducts();
  res.status(200).json(products);
}));

// GET product by id
router.get("/:id", tryCatch(async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await getProductById(productId);
  res.status(200).json(product);
}));

// POST new product
router.post("/", tryCatch(async (req, res) => {
  const productData = req.body;
  const product = await addProduct(productData);
  res.status(201).json(product);
}));

// DELETE product by id
router.delete("/:id", tryCatch(async (req, res) => {
  const productId = parseInt(req.params.id);
  await deleteProductById(productId);
  res.status(204).send(`Product with ID: ${productId} deleted successfully`);
}));

// UPDATE product by id
router.put("/:id", tryCatch(async (req, res) => handleUpdateProduct(req, res, "PUT")));

router.patch("/:id", tryCatch(async (req, res) => handleUpdateProduct(req, res, "PATCH")));

module.exports = router;
