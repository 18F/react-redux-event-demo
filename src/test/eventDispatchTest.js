import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("eventDispatch integration test", () => {
  let fixture;
  let getState;
  let genericDispatcher, genericDispatcher2, genericDispatcher3;
  
  beforeEach(() => {
    genericDispatcher = spy();
    genericDispatcher2 = spy();
    genericDispatcher3 = spy();
    getState = stub();

    const dispatchers = [ genericDispatcher, genericDispatcher2, genericDispatcher3 ];
    fixture = proxyquire("../main/eventDispatch", {
      "./dispatchers": dispatchers,
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
    expect(genericDispatcher2.calledOnce).to.be.true;
    expect(genericDispatcher2.calledWith(state, event)).to.be.true;
    expect(genericDispatcher3.calledOnce).to.be.true;
    expect(genericDispatcher3.calledWith(state, event)).to.be.true;
  });
});
