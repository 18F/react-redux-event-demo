import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { spy, stub } from "sinon";

chai.use(chaiAsPromised);

import { getDispatchForHandlers, ignored, makeHandler } from "../main/handler";

describe("handler", () => {
  let callback;

  let handlers, genericHandler, genericHandler2, genericHandler3, genericHandler4;
  let getState;
  
  const eventType = "lwfijw8gy824ijrwfn";
  const otherEventType = "48g90";
  const state = {
    state: "goes here"
  };
  
  beforeEach(() => {
    callback = stub();
    getState = stub();
    genericHandler = spy();
    genericHandler2 = spy();
    genericHandler3 = spy();
    genericHandler4 = spy();

    handlers = {
      ["type1"]: [ genericHandler ],
      ["type2"]: [ genericHandler2 ],
      ["type3"]: [ genericHandler3, genericHandler4 ]
    };
  });
  
  it("calls the callback if the event matches", () => {
    const event = {
      type: eventType,
      something: "other"
    };
    const result = {
      returnThis: "please"
    };
    
    callback.withArgs(state, event).returns(result);

    const handler = makeHandler(eventType, callback);
    const actual = handler(state, event);
    
    expect(callback.calledOnce).to.be.true;
    expect(actual).to.eventually.equal(result);
  });

  it("ignores irrelevant events", () => {
    const event = {
      type: eventType + "some other string",
      blah: "foo"
    };

    const handler = makeHandler(eventType, callback);
    const actual = handler(state, event);

    expect(callback.callCount).to.equal(0);
    expect(actual).to.eventually.equal(ignored);
  });

  it("presents events to registered handlers", () => {
    const event = { type: "type3", value: "world" };
    const state = {
      oblivious: {
        hello: "world",
        what: "is your name?"
      }
    };
    getState.returns(state);

    const dispatch = getDispatchForHandlers(handlers, getState);
    dispatch(event);

    expect(genericHandler.called).to.be.false;
    expect(genericHandler2.called).to.be.false;
    expect(genericHandler3.calledOnce).to.be.true;
    expect(genericHandler3.calledWith(state, event)).to.be.true;
    expect(genericHandler4.calledOnce).to.be.true;
    expect(genericHandler4.calledWith(state, event)).to.be.true;
  });

});
