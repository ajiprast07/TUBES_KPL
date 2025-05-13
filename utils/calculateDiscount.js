const fs = require("fs");
const path = require("path");

let discountRules = {};

try {
  const rawData = fs.readFileSync(
    path.join(__dirname, "../config/discount.json")
  );
  discountRules = JSON.parse(rawData);
} catch (error) {
  console.error("Failed to load discount rules:", error);
}

function calculateDiscount(price, category) {
  const rate = discountRules[category] || 0;
  return price * rate;
}

module.exports = calculateDiscount;
