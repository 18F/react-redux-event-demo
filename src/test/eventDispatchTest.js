import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("eventDispatch integration test", () => {
  let fixture;
  let getState;
  let genericHandler, genericHandler2, genericHandler3;
  
  beforeEach(() => {
    genericHandler = spy();
    genericHandler2 = spy();
    genericHandler3 = spy();
    getState = stub();

    const handlers = [ genericHandler, genericHandler2, genericHandler3 ];
    fixture = proxyquire("../main/eventDispatch", {
      "./handlers": handlers,
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

    expect(genericHandler.calledOnce).to.be.true;
    expect(genericHandler.calledWith(state, event)).to.be.true;
    expect(genericHandler2.calledOnce).to.be.true;
    expect(genericHandler2.calledWith(state, event)).to.be.true;
    expect(genericHandler3.calledOnce).to.be.true;
    expect(genericHandler3.calledWith(state, event)).to.be.true;
  });
});
