const validCategories = ["Sembako", "Sabun", "Food"];

function validateProduct(product) {
  const { name, price, category, stock } = product;

  if (!name || typeof name !== "string") return "Invalid product name";
  if (typeof price !== "number" || price <= 0) return "Invalid price";
  if (!validCategories.includes(category)) return "Invalid category";
  if (typeof stock !== "number" || stock < 0) return "Invalid stock";

  return null;
}

module.exports = validateProduct;
