import { Promise } from "es6-promise";
import chai, { expect, assert } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";

proxyquire.noCallThru();

describe("find candidates with name like handler", () => {
  let fixture;
  let fetchProxy;
  let dispatch;
  let getState;
  let setApiResultsAction;
  let setApiResultsError;

  beforeEach(() => {
    fetchProxy = stub();
    dispatch = spy();
    getState = stub();
    setApiResultsAction = stub();
    setApiResultsError = stub();
    
    fixture = proxyquire("../../main/handlers/findCandidatesWithNameLike", {
      "../fetchHandler": fetchProxy,
      "../reduxStore": {
        dispatch: dispatch,
        getState: getState
      },
      "../actionCreators/setApiResults": setApiResultsAction,
      "../actionCreators/setApiResultsError": setApiResultsError
    }).default;
  });

  it("fetches all the o'neals from the api and dispatches an action with the results", () => {
    const apiKey = "APIKEY";
    const name = "o'neal";
    getState.returns({
      fec: {
        apiKey: apiKey,
        candidateName: name
      }
    });
    
    const results = {
      "Hi": "world"
    };
    const apiResponse = {
      api_version: 2.0,
      results: results
    };
    const jsonPromise =  Promise.resolve(apiResponse);
    const action = { i: "have results and you don't" };
    fetchProxy
      .withArgs(`https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=${apiKey}`)
      .returns(jsonPromise);
    setApiResultsAction.withArgs(results).returns(action);

    return fixture(name).then(() => {
      expect(dispatch.calledWith(action)).to.be.true;
    });    
  });

  it("fails to fetch anything from the api and dispatches an action as an error", () => {
    const apiKey = "APIKEY";
    const name = "o'neal";
    getState.returns({
      fec: {
        apiKey: apiKey,
        candidateName: name
      }
    });
    
    const rejectedPromise =  Promise.reject(new Error("no network, or bad response"));
    const errorAction = { type: "fail fail", filler: "lots" };
    fetchProxy
      .withArgs(`https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=${apiKey}`)
      .returns(rejectedPromise);
    setApiResultsError.returns(errorAction);
    
    return fixture(name).then(() => {
      expect(dispatch.calledWith(errorAction)).to.be.true;
    });
  });

});
