const dataStore = require("../models/dataStore");
const validateProduct = require("../utils/validateProduct");

exports.getAllProducts = (req, res) => {
  res.json(dataStore.products);
};

exports.createProduct = (req, res) => {
  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  const product = {
    id: Date.now().toString(),
    ...req.body,
  };

  dataStore.products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const index = dataStore.products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  dataStore.products[index] = { id, ...req.body };
  res.json(dataStore.products[index]);
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = dataStore.products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  dataStore.products.splice(index, 1);
  res.status(204).send();
};
