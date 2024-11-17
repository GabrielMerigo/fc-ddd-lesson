import { Sequelize } from "sequelize";

describe("Product Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {
        force: true,
      },
    });
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
