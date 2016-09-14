import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("eventDispatch", () => {
  let fixture;
  
  let getState;
  let getDispatchForHandlers;
  let dispatchEvent;
  
  beforeEach(() => {
    getState = spy();

    getDispatchForHandlers = stub();
    dispatchEvent = spy();
    
    const handlers = {
      type1: [ () => { } ],
      type2: [ () => { } ],
      type3: [ () => { }, () => { } ]
    };

    getDispatchForHandlers.withArgs(handlers, getState).returns(dispatchEvent);
    
    fixture = proxyquire("../main/eventDispatch", {
      "./handlers": handlers,
      "./handler": {
        getDispatchForHandlers: getDispatchForHandlers
      },
      "./reduxStore": {
        getState: getState
      }
    }).default;
  });
  
  it("presents events to registered handlers", () => {
    const event = { type: "hello", value: "world" };

    fixture(event);

    expect(dispatchEvent.calledOnce).to.be.true;
    expect(dispatchEvent.calledWith(event)).to.be.true;
  });
});
