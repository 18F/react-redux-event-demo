import { expect } from "chai";
import { stub } from "sinon";

import fixture from "../main/handler";

describe("handler", () => {
  let callback;

  const eventType = "lwfijw8gy824ijrwfn";
  const otherEventType = "48g90";
  const state = {
    state: "goes here"
  };
  
  beforeEach(() => {
    callback = stub();
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

    const handler = fixture(eventType, callback);
    const actual = handler(state, event);
    
    expect(callback.calledOnce).to.be.true;
    expect(actual).to.eventually.equal(result);
  });

  it("ignores irrelevant events", () => {
    const event = {
      type: eventType + "some other string",
      blah: "foo"
    };

    const handler = fixture(eventType, callback);
    const actual = handler(state, event);

    expect(callback.callCount).to.equal(0);
    expect(actual).to.eventually.equal("no-op");
  });

});
