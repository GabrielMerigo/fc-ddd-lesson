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
});
