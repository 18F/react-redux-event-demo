import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { spy, stub } from "sinon";

chai.use(chaiAsPromised);

import getDispatchForHandlers from "../main/eventHandler";

describe("eventHandler", () => {
  let callback;

  let handlers, genericHandler, genericHandler2, genericHandler3, genericHandler4;
  let getState, dispatch;
  
  const eventType = "lwfijw8gy824ijrwfn";
  const otherEventType = "48g90";
  const state = {
    state: "goes here"
  };
  
  beforeEach(() => {
    callback = stub();
    getState = stub();
    dispatch = stub();
    genericHandler = spy();
    genericHandler2 = spy();
    genericHandler3 = spy();
    genericHandler4 = spy();

    handlers = [{
      [ eventType ]: [ genericHandler ],
      [ "type-whatever" ]: [ genericHandler2 ]
    }, {
      [ otherEventType ]: [ genericHandler3, genericHandler4 ]
    }];
  });
  
  it("presents events to a single registered handler", () => {
    const event = { type: eventType, value: "world" };
    const state = {
      oblivious: {
        hello: "world",
        what: "is your name?"
      }
    };
    getState.returns(state);

    const { dispatchEvent } = getDispatchForHandlers(handlers, { getState, dispatch });
    dispatchEvent(event);

    expect(genericHandler.calledOnce).to.be.true;
    expect(genericHandler.calledWith({ state, event, getState, dispatch, dispatchEvent })).to.be.true;
    expect(genericHandler2.called).to.be.false;
    expect(genericHandler3.called).to.be.false;
    expect(genericHandler4.called).to.be.false;
  });

  it("presents events to multiple registered handlers", () => {
    const event = { type: otherEventType, value: "world" };
    const state = {
      oblivious: {
        hello: "world",
        what: "is your name?"
      }
    };
    getState.returns(state);

    const { dispatchEvent } = getDispatchForHandlers(handlers, { getState, dispatch });
    dispatchEvent(event);

    expect(genericHandler.called).to.be.false;
    expect(genericHandler2.called).to.be.false;
    expect(genericHandler3.calledOnce).to.be.true;
    expect(genericHandler3.calledWith({ state, event, getState, dispatch, dispatchEvent })).to.be.true;
    expect(genericHandler4.calledOnce).to.be.true;
    expect(genericHandler4.calledWith({ state, event, getState, dispatch, dispatchEvent })).to.be.true;
  });
  
  it("presents all events to attached handlers", () => {
    const event = { type: otherEventType, value: "world" };
    const event2 = { type: eventType, value: "what" };
    const state = {
      oblivious: {
        hello: "world",
        what: "is your name?"
      }
    };
    getState.returns(state);

    const { dispatchEvent, attach, detach } = getDispatchForHandlers([], { getState, dispatch });
    attach(genericHandler);
    attach(genericHandler3);
    dispatchEvent(event);
    dispatchEvent(event2);

    expect(genericHandler.calledTwice).to.be.true;
    expect(genericHandler3.calledTwice).to.be.true;
    expect(genericHandler.calledWith({ state, event, getState, dispatch, dispatchEvent })).to.be.true;
    expect(genericHandler3.calledWith({ state, event, getState, dispatch, dispatchEvent })).to.be.true;
    expect(genericHandler.calledWith({ state, event: event2, getState, dispatch, dispatchEvent })).to.be.true;
    expect(genericHandler3.calledWith({ state, event: event2, getState, dispatch, dispatchEvent })).to.be.true;
  });
    
  it("does not present events to detached handlers while presenting them to the remaining attached handlers", () => {
    const event = { type: otherEventType, value: "world" };
    const event2 = { type: eventType, value: "what" };
    const state = {
      oblivious: {
        hello: "world",
        what: "is your name?"
      }
    };
    getState.returns(state);

    const { dispatchEvent, attach, detach } = getDispatchForHandlers([{
      [ eventType ]: [ genericHandler2 ]
    }], { getState, dispatch });
    attach(genericHandler);
    attach(genericHandler3);
    detach(genericHandler);
    dispatchEvent(event);
    dispatchEvent(event2);

    expect(genericHandler.called).to.be.false;
    expect(genericHandler2.calledOnce).to.be.true;
    expect(genericHandler2.calledWith({ state, event: event2, getState, dispatch, dispatchEvent })).to.be.true;
    expect(genericHandler3.calledTwice).to.be.true;
    expect(genericHandler3.calledWith({ state, event, getState, dispatch, dispatchEvent })).to.be.true;
    expect(genericHandler3.calledWith({ state, event: event2, getState, dispatch, dispatchEvent })).to.be.true;
  });

});
