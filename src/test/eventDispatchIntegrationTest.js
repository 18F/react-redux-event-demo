import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("eventDispatch integration test", () => {
  let fixture;
  let eventDispatch;
  let genericDispatcher;
  
  beforeEach(() => {
    genericDispatcher = spy();
    fixture = proxyquire("../main/eventDispatch", {
      "./dispatchers": [ genericDispatcher ]
    }).default;
  });
  
  it("presents events to registered dispatchers", () => {
    const event = { type: "hello", value: "world" };
    fixture(event);
    expect(genericDispatcher.calledOnce).to.be.true;
    expect(genericDispatcher.calledWith(event)).to.be.true;
  });
});
