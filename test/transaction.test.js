const request = require("supertest");
const app = require("../app");
const dataStore = require("../models/dataStore");

describe("Transaction API", () => {
  beforeEach(() => {
    dataStore.products = [
      {
        id: "10",
        name: "Sabun Cuci",
        price: 1000,
        category: "Sabun",
        stock: 5,
      },
    ];
    dataStore.transactions = [];
  });

  it("POST /api/transactions → should create transaction and reduce stock", async () => {
    const res = await request(app).post("/api/transactions").send({
      productId: "10",
      quantity: 1,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.total).toBeCloseTo(900); // 10% diskon dari 1000
    expect(dataStore.products[0].stock).toBe(4); // stok berkurang
  });
});
