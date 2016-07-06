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
    const event = { type: "hello", value: "world" };
    
    fixture.attach(genericDispatcher);
    fixture.dispatch(event);
    expect(genericDispatcher.calledOnce).to.be.true;
    expect(genericDispatcher.calledWith(event)).to.be.true;
  });

  it("presents event to attached dispatcher only once even if registered multiple times", () => {
    const fixture = proxyquire("../main/eventBus", {}).default;
    const genericDispatcher = spy(); 
    const event = { type: "hello", value: "world" };
    
    fixture.attach(genericDispatcher);
    fixture.attach(genericDispatcher);
    fixture.dispatch(event);
    expect(genericDispatcher.calledOnce).to.be.true;
    expect(genericDispatcher.calledWith(event)).to.be.true;
  });

});
