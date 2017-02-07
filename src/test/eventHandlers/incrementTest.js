import { expect } from "chai";
import { stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("increment event handler", () => {
  let fixture;
  let dispatch;

  const incrementType = "increment type goes here";
  const incrementActionInstance = {
    hello: "world"
  };
  
  const incrementAction = () => incrementActionInstance;
  
  beforeEach(() => {
    dispatch = stub();

    fixture = proxyquire("../../main/eventHandlers/increment", {
      "../eventCreators/increment": {
        type: incrementType
      },
      "../actionCreators/increment": incrementAction
    }).default;
  });
  
  it("dispatches action to store ", () => {
    const dispatchedAction = { "dispatcho": "gazpacho" };
    
    dispatch.withArgs(incrementActionInstance).returns(dispatchedAction);

    const actual = fixture({ dispatch });

    expect(actual).to.equal(dispatchedAction);
  });
});
