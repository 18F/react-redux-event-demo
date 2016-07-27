import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("set api key event handler", () => {
  let fixture;
  let dispatch;
  const apiKey = "API Key f88ij8u9jjfgsf";
  let setApiKeyActionCreatorStub;

  beforeEach(() => {
    dispatch = spy();
    setApiKeyActionCreatorStub = stub();

    fixture = proxyquire("../../main/handlers/setApiKey", {
      "../reduxStore": {
        dispatch: dispatch
      },
      "../actionCreators/setApiKey": setApiKeyActionCreatorStub
    }).default;
  });
  
  it("dispatches set api key action to store ", () => {
    const setApiKeyAction = { action: "here" };
    setApiKeyActionCreatorStub.withArgs(apiKey).returns(setApiKeyAction);

    fixture(apiKey);

    expect(dispatch.calledOnce).to.be.true;
    expect(dispatch.calledWith(setApiKeyAction)).to.be.true;
  });

});
