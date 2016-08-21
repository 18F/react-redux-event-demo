import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("set api key event handler", () => {
  let fixture;
  let dispatch;
  let setApiKeyActionCreatorStub;
  const setApiKeyType = "setApiKeyType";
  const apiKey = "API Key f88ij8u9jjfgsf";
  const state = {
    "words": "have meaning"
  };
  
  beforeEach(() => {
    dispatch = spy();
    setApiKeyActionCreatorStub = stub();

    fixture = proxyquire("../../main/handlers/setApiKey", {
      "../reduxStore": {
        dispatch: dispatch
      },
      "../eventCreators/setApiKey": {
        type: setApiKeyType
      },
      "../actionCreators/setApiKey": setApiKeyActionCreatorStub
    }).default;
  });
  
  it("dispatches set api key action to store ", () => {
    const event = {
      type: setApiKeyType,
      apiKey: apiKey
    };
    const setApiKeyAction = { action: "here" };
    setApiKeyActionCreatorStub.withArgs(apiKey).returns(setApiKeyAction);

    const actual = fixture(state, event);
    
    expect(dispatch.calledOnce).to.be.true;
    expect(dispatch.calledWith(setApiKeyAction)).to.be.true;
    expect(actual).to.eventually.equal(setApiKeyAction);
  });

  it("ignores irrelevant events", () => {
    const event = {
      type: setApiKeyType + "some other string",
      apiKey: apiKey
    };

    const actual = fixture(state, event);

    expect(actual).to.eventually.equal("no-op");
  });
});
