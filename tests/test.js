const { expect } = require("chai");
const { describe, it } = require("mocha");

describe("Maths tests", () => {
    it("Should equal 2", () => {
        expect(1 + 1).to.equal(2);
    });
    it("Should not equal 2", () => {
        expect(1 + 1).to.equal(3);
    });
})