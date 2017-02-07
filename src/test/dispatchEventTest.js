import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("dispatchEvent", () => {
  let fixture;
  
  let getState;
  let getDispatchForHandlers;
  let generatedDispatchEvent;
  
  beforeEach(() => {
    getDispatchForHandlers = stub();
    generatedDispatchEvent = spy();

    const store = {
      hello: "world"
    };
    
    const eventDispatch = {
      dispatchEvent: generatedDispatchEvent
    };
    
    const handlers = {
      type1: [ () => { } ],
      type2: [ () => { } ],
      type3: [ () => { }, () => { } ]
    };

    getDispatchForHandlers.withArgs([ handlers ], store).returns(eventDispatch);
    
    fixture = proxyquire("../main/dispatchEvent", {
      "./eventHandlers": handlers,
      "./eventHandler": getDispatchForHandlers,
      "./reduxStore": store
    }).default;
  });
  
  it("dispatches events to registered handlers", () => {
    const event = { type: "hello", value: "world" };

    fixture(event);

    expect(generatedDispatchEvent.calledOnce).to.be.true;
    expect(generatedDispatchEvent.calledWith(event)).to.be.true;
  });
});
