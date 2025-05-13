// app.js
const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;
