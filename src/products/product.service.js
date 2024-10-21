const prisma = require("../database/index.js");

const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;  
};

const getProductById = async (productId) => {
  if (typeof productId !== "number" || isNaN(productId)) {
    throw new Error("ID must be a number");
  }
  
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const addProduct = async (newProductData) => {
  if (!(newProductData.name && newProductData.price && newProductData.quantity)) {
    throw new Error("Name, Price, and Quantity are required");
  }

  if (typeof newProductData.price !== "number" || typeof newProductData.quantity !== "number") {
    throw new Error("Price and Quantity must be numbers");
  }

  if (newProductData.price <= 0 || newProductData.quantity <= 0) {
    throw new Error("Price and Quantity must be positive");
  }

  const product = await prisma.product.create({
    data: newProductData,
  });

  return product;
}

const deleteProductById = async (productId) => {
  await getProductById(productId);

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
};


const handleUpdateProduct = async (req, res, method) => {
  const productId = parseInt(req.params.id);
  const newProductData = req.body;

  await updateProductById(productId, newProductData, method);
  
  res.status(204).send(`Product with ID: ${productId} has been Updated`);
}

const updateProductById = async (productId, newProductData , method) => {
  await getProductById(productId);

  if(method === "PUT") {
    if (!(newProductData.name && newProductData.price && newProductData.quantity && newProductData.description)) {
      throw new Error("Name, Price, Quantity, and Description are required");
    }
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: newProductData,
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
  handleUpdateProduct
};
