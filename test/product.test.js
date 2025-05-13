const request = require("supertest");
const app = require("../app");
const dataStore = require("../models/dataStore");

describe("Product API", () => {
  beforeEach(() => {
    dataStore.products = []; // reset
  });

  it("POST /api/products → should create product", async () => {
    const newProduct = {
      name: "Sabun Mandi",
      price: 75,
      category: "Sabun",
      stock: 20,
    };
    const res = await request(app).post("/api/products").send(newProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Sabun Mandi");
    expect(res.body.stock).toBe(20);
  });

  it("POST /api/products → should fail with invalid category", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Produk Tidak Valid",
      price: 100,
      category: "Elektronik", // kategori tidak valid
      stock: 80,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid category");
  });
});
