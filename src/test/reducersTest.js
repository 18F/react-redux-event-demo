import { expect } from "chai";
import proxyquire from "proxyquire";

proxyquire.noCallThru();

describe("maps reducers", () => {
  let fixture;
  const HELLO = "is it me you're looking for?";
  
  beforeEach(() => {
    fixture = proxyquire("../main/reducers.js", {
      "./reducers/helloReducer": HELLO
    }).default;
  });
  
  it("maps hello reducer", () => {
    expect(fixture.hello).to.equal(HELLO);
  });
  
});
