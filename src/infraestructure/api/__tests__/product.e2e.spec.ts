import request from "supertest";
import { app, sequelize } from "../express";

describe("[E2E] Product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/products").send({});

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    await request(app).post("/products").send({
      name: "Product 1",
      price: 100,
    });

    await request(app).post("/products").send({
      name: "Product 2",
      price: 200,
    });

    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    // Product 1
    expect(response.body.products[0].name).toBe("Product 1");
    expect(response.body.products[0].price).toBe(100);
    // Product 2
    expect(response.body.products[1].name).toBe("Product 2");
    expect(response.body.products[1].price).toBe(200);
  });
});
