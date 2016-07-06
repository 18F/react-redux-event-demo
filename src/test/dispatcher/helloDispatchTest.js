import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

const incrementType = "increment type";

describe("helloDispatch", () => {
  let fixture;
  let incrementHandler;
  
  beforeEach(() => {
    incrementHandler = spy();
    fixture = proxyquire("../../main/dispatchers/helloDispatch", {
      "../eventCreators/increment": {
        type: incrementType
      },
      "../handlers/increment": incrementHandler
    }).default;
  });
  
  it("routes to increment handler", () => {
    fixture({ type: incrementType });
    expect(incrementHandler.calledOnce).to.be.true;
  });

  it("ignores requests it doesn't care about", () => {
    fixture({ type: "Lfileuhhe48" });
    expect(incrementHandler.notCalled).to.be.true;
  });

});
