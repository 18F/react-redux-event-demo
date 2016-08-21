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

    fixture = proxyquire("../../main/handlers/increment", {
      "../reduxStore": {
        dispatch: dispatch
      },
      "../eventCreators/increment": {
        type: incrementType
      },
      "../actionCreators/increment": incrementAction
    }).default;
  });
  
  it("dispatches action to store ", () => {
    const state = {
      whatever: "you say"
    };
    const event = {
      type: incrementType
    };

    dispatch.withArgs(incrementActionInstance).returns(incrementActionInstance);

    const actual = fixture(state, event);
   
    expect(dispatch.calledOnce).to.be.true;
    expect(dispatch.calledWith(incrementActionInstance)).to.be.true;

    expect(actual).to.eventually.equal(incrementActionInstance);
  });
  
  it("ignores irrelevant events", () => {
    const state = {
      hello: "world"
    };
    const event = {
      type: incrementType + "2597iv8"
    };

    const actual = fixture(state, event); 

    return expect(actual).to.eventually.equal("no-op");
  });

});
