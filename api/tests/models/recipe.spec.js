const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: false }));
    describe("Title", () => {
      it("Should throw an error if title is null", (done) => {
        Recipe.create({
          summary: "Pizza calabresa con el mejor salame y aceitunas negras",
        })
          .then(() => done(new Error("Please put a title to your recipe!")))
          .catch(() => done());
      });
      it("Should throw an error if summary is null", () => {
        Recipe.create({ title: "Pizza calabresa" })
          .then(() => done(new Error("Please add a summary to your recipe!")))
          .catch(() => done());
      });
    });
    describe("Aggregate Likes", () => {
      it("Shouldn't work with a string in aggregateLikes", (done) => {
        Recipe.create({
          title: "Pizza calabresa",
          summary: "Pizza calabresa con el mejor salame y aceitunas negras",
          aggregateLikes: "NaN",
        })
          .then(() => done("Should not be created"))
          .catch(() => done());
      });
    });

    describe("Health Score", () => {
      it("Shouldn't work with a string in healthScore", (done) => {
        Recipe.create({
          title: "Pizza calabresa",
          summary: "Pizza calabresa con el mejor salame y aceitunas negras",
          healthScore: "NaN",
        })
          .then(() => done("Should not be created"))
          .catch(() => done());
      });
    });
  });
});
