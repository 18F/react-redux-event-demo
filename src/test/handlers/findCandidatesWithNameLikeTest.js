import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("find candidates with name like handler", () => {
  let fixture;
  let fetchProxy = stub();
  let dispatch = spy();
  let getState = stub();
  let setApiResultsAction = stub();
  let setApiResultsError = stub();

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
    const results = {
      "Hi": "world"
    };
    const response = {
      api_version: 2.0,
      results: results
    };
    const jsonPromise =  Promise.resolve({
      json: () => {
        return Promise.resolve(response);
      }
    });
    const action = { i: "have results and you don't" };    
    fetchProxy
      .withArgs(`https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=${apiKey}`)
      .returns(jsonPromise);
    getState.returns({
      fec: {
        apiKey: apiKey,
        candidateName: name
      }
    });
    setApiResultsAction.withArgs(results).returns(action);
    
    fixture(name);
    
    expect(Promise.resolve(dispatch.calledWith(action))).to.eventually.be.true;
  });

  it("fails to fetch anything from the api and dispatches an action as an error", () => {
    const apiKey = "APIKEY";
    const name = "o'neal";
    const rejectedPromise =  Promise.reject(new Error("no network, or bad response"));
    const errorAction = { type: "fail fail", filler: "lots" };
    fetchProxy
      .withArgs(`https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=${apiKey}`)
      .returns(rejectedPromise);
    getState.returns({
      fec: {
        apiKey: apiKey,
        candidateName: name
      }
    });
    setApiResultsError.returns(errorAction);
    
    fixture(name);

    expect(Promise.resolve(dispatch.calledWith(errorAction))).to.eventually.be.true;
  });

});
