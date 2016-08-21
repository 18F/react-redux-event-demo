import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("eventBus integration test", () => {
  let fixture;
  let eventDispatch;
  let genericDispatcher;
  
  it("presents event to attached dispatchers", () => {
    const fixture = proxyquire("../main/eventBus", {}).default;
    const genericDispatcher = spy();
    const state = { something: "here" };
    const event = { type: "hello", value: "world" };
    
    fixture.attach(genericDispatcher);
    fixture.dispatch(state, event);
    expect(genericDispatcher.calledOnce).to.be.true;
    expect(genericDispatcher.calledWith(state, event)).to.be.true;
  });

  it("presents event to attached dispatcher only once even if registered multiple times", () => {
    const fixture = proxyquire("../main/eventBus", {}).default;
    const genericDispatcher = spy();
    const state = { cheese: "sandwich" };
    const event = { type: "hello", value: "world" };
    
    fixture.attach(genericDispatcher);
    fixture.attach(genericDispatcher);
    fixture.dispatch(state, event);
    expect(genericDispatcher.calledOnce).to.be.true;
    expect(genericDispatcher.calledWith(state, event)).to.be.true;
  });

});
