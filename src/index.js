const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./products/product.controller");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// test API
app.use("/test", (req, res) => {
    res.send("API is working fine");
})

//routes Products
app.use("/products", productRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});