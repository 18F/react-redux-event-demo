import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("eventDispatch integration test", () => {
  let fixture;
  let getState;
  let genericDispatcher;
  
  beforeEach(() => {
    genericDispatcher = spy();
    getState = stub();

    fixture = proxyquire("../main/eventDispatch", {
      "./dispatchers": [ genericDispatcher ],
      "./reduxStore": {
        getState: getState
      }
    }).default;
  });
  
  it("presents events to registered dispatchers", () => {
    const event = { type: "hello", value: "world" };
    const state = {
      oblivious: {
        hello: "world",
        what: "is your name?"
      }
    };
    getState.returns(state);

    fixture(event);
    expect(genericDispatcher.calledOnce).to.be.true;
    expect(genericDispatcher.calledWith(state, event)).to.be.true;
  });
});
