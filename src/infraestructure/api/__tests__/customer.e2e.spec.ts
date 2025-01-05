import { app, sequelize } from "../express";
import request from "supertest";

describe("[E2E] Customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });


  it("should create a customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "1234567890",
      },
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("1234567890");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "John",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    await request(app).post("/customers").send({
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "1234567890",
      },
    });

    const response = await request(app).get("/customers");
    expect(response.status).toBe(200);

    expect(response.body.customers.length).toBe(1);
    expect(response.body.customers[0].name).toBe("John");
    expect(response.body.customers[0].address.street).toBe("Street");
    expect(response.body.customers[0].address.city).toBe("City");
    expect(response.body.customers[0].address.number).toBe(123);
    expect(response.body.customers[0].address.zip).toBe("1234567890");
  });

});
