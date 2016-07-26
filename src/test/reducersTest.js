import { expect } from "chai";
import proxyquire from "proxyquire";

proxyquire.noCallThru();

describe("maps reducers", () => {
  let fixture;
  const FEC = "Something is here";
  const HELLO = "is it me you're looking for?";
  
  beforeEach(() => {
    fixture = proxyquire("../main/reducers.js", {
      "./reducers/helloReducer": HELLO,
      "./reducers/fecReducer": FEC
    }).default;
  });
  
  it("maps hello reducer", () => {
    expect(fixture.hello).to.equal(HELLO);
  });
  
  it("maps fec reducer", () => {
    expect(fixture.fec).to.equal(FEC);
  });
  
});
