import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

const incrementType = "increment type";

describe("increment event handler", () => {
  let fixture;
  let dispatch;
  const incrementActionInstance = {
    hello: "world"
  };
  const incrementAction = () => incrementActionInstance;
  
  beforeEach(() => {
    dispatch = spy();

    fixture = proxyquire("../../main/handlers/increment", {
      "../reduxStore": {
        dispatch: dispatch
      },
      "../actionCreators/increment": incrementAction
    }).default;
  });
  
  it("dispatches action to store ", () => {
    fixture();
    expect(dispatch.calledOnce).to.be.true;
    expect(dispatch.calledWith(incrementActionInstance)).to.be.true;
  });

});
