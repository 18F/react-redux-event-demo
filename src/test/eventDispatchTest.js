import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("eventDispatch", () => {
  let fixture;
  
  let getState, makeHandler;
  let genericHandler, genericHandler2, genericHandler3, genericHandler4;
  let typedHandler, typedHandler2, typedHandler3, typedHandler4;
  
  beforeEach(() => {
    getState = stub();
    makeHandler = stub();
    
    genericHandler = spy();
    genericHandler2 = spy();
    genericHandler3 = spy();
    genericHandler4 = spy();
    typedHandler = spy();
    typedHandler2 = spy();
    typedHandler3 = spy();
    typedHandler4 = spy();
    
    const handlers = {
      ["type1"]: [ genericHandler ],
      ["type2"]: [ genericHandler2 ],
      ["type3"]: [ genericHandler3, genericHandler4 ]
    };
    
    makeHandler.withArgs("type1", genericHandler).returns(typedHandler);
    makeHandler.withArgs("type2", genericHandler2).returns(typedHandler2);
    makeHandler.withArgs("type3", genericHandler3).returns(typedHandler3);
    makeHandler.withArgs("type3", genericHandler4).returns(typedHandler4);
    
    fixture = proxyquire("../main/eventDispatch", {
      "./handlers": handlers,
      "./handler": makeHandler,
      "./reduxStore": {
        getState: getState
      }
    }).default;
  });
  
  it("presents events to registered handlers", () => {
    const event = { type: "hello", value: "world" };
    const state = {
      oblivious: {
        hello: "world",
        what: "is your name?"
      }
    };
    getState.returns(state);

    fixture(event);

    expect(typedHandler.calledOnce).to.be.true;
    expect(typedHandler.calledWith(state, event)).to.be.true;
    expect(typedHandler2.calledOnce).to.be.true;
    expect(typedHandler2.calledWith(state, event)).to.be.true;
    expect(typedHandler3.calledOnce).to.be.true;
    expect(typedHandler3.calledWith(state, event)).to.be.true;
    expect(typedHandler4.calledOnce).to.be.true;
    expect(typedHandler4.calledWith(state, event)).to.be.true;
  });
});
