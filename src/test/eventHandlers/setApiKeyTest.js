import { expect } from "chai";
import { stub } from "sinon";
import proxyquire from "proxyquire";

proxyquire.noCallThru();

describe("set api key event handler", () => {
  let fixture;
  let dispatch;
  let setApiKeyActionCreator;

  const apiKey = "API Key f88ij8u9jjfgsf";
  const state = {
    "words": "have meaning"
  };
  
  beforeEach(() => {
    dispatch = stub();
    setApiKeyActionCreator = stub();

    fixture = proxyquire("../../main/eventHandlers/setApiKey", {
      "../reduxStore": {
        dispatch: dispatch
      },
      "../actionCreators/setApiKey": setApiKeyActionCreator
    }).default;
  });
  
  it("dispatches set api key action to store when given a compatible event", () => {
    const event = {
      apiKey: apiKey
    };
    const setApiKeyAction = { action: "here" };
    const dispatchedAction = {
      dispatchedAction: "output, whatever it might be"
    };
    
    setApiKeyActionCreator.withArgs(apiKey).returns(setApiKeyAction);
    dispatch.withArgs(setApiKeyAction).returns(dispatchedAction);
    
    const actual = fixture(state, event);

    expect(actual).to.equal(dispatchedAction);
  });
});
