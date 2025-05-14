const dataStore = require("../models/dataStore");
const calculateDiscount = require("../utils/calculateDiscount");

exports.getAllTransactions = (req, res) => {
  res.json(dataStore.transactions);
};

exports.createTransaction = (req, res) => {
  const { productId, quantity } = req.body;
  const product = dataStore.products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  if (product.stock < quantity)
    return res.status(400).json({ error: "Insufficient stock" });

  const discount = calculateDiscount(product.price, product.category);
  const finalPrice = (product.price - discount) * quantity;

  const transaction = {
    id: Date.now().toString(),
    productId,
    quantity,
    total: finalPrice,
  };

  product.stock -= quantity;
  dataStore.transactions.push(transaction);
  res.status(201).json(transaction);
};
