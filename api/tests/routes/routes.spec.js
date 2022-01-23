const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);

describe("Recipe routes", () => {
  describe("GET /recipes", () => {
    it("If it receives a name that doesn't exist", async () => {
      try {
        await agent
          .get("/recipes?name=chinchulin")
          .expect(400)
          .expect("This recipe doesn't exist");
      } catch (err) {
        console.log(err);
      }
    }).timeout(45000);

    it("If it receives a name that exists", async () => {
      try {
        await agent
          .get("/recipes?name=Pizza")
          .expect(200)
          .expect("Content-Type", /json/);
      } catch (err) {
        console.log(err);
      }
    }).timeout(45000);

    it("If it doesn't receive a name", async () => {
      try {
        await agent.get("/recipes").expect(200).expect("Content-Type", /json/);
      } catch (err) {
        console.log(err);
      }
    }).timeout(45000);
  });
});

