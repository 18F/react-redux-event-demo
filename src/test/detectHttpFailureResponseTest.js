import { expect } from "chai";
import fixture from "../main/detectHttpFailureResponse";

describe("detectHttpFailureResponse", () => {
  it("lets non-error response through", () => {
    const response = { status: 200, otherStuff: "here" };
    
    const actual = fixture(response);
    
    expect(actual).to.deep.equal(response);
  });

  it("throws an error on an HTTP error", () => {
    const response = { status: 422, otherStuff: "here" };

    const boundFixtureCall = fixture.bind(this, response);
    
    expect(boundFixtureCall).to.throw(Error);
  });
});
