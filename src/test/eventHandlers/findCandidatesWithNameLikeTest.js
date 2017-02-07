import { Promise } from "es6-promise";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";

chai.use(chaiAsPromised);
proxyquire.noCallThru();

describe("find candidates with name like handler", () => {
  let fixture;
  let fetchProxy;
  let dispatch;
  let setCandidatesAction;

  const apiKey = "APIKEY";
  const name = "o'neal";
  const state = {
    fec: {
      apiKey: apiKey,
      candidateName: name
    }
  };

  const errorAction = { type: "fail fail", filler: "lots" };
  const setCandidatesError = () => errorAction;
  
  beforeEach(() => {
    fetchProxy = stub();
    dispatch = stub();
    setCandidatesAction = stub();
    
    fixture = proxyquire("../../main/eventHandlers/findCandidatesWithNameLike", {
      "../fetchHandler": fetchProxy,
      "../actionCreators/setCandidates": setCandidatesAction,
      "../actionCreators/setCandidatesError": setCandidatesError
    }).default;
  });

  it("fetches all the o'neals from the api and dispatches an action with the results", () => {
    const event = { };
    
    const results = {
      "Hi": "world"
    };
    const apiResponse = {
      api_version: 2.0,
      results: results
    };
    const jsonPromise = Promise.resolve(apiResponse);
    const action = { i: "have results and you don't" };
    const success = "something.";
    wireFetchProxyWithResponsePromise(jsonPromise);
    setCandidatesAction.withArgs(results).returns(action);
    dispatch.withArgs(action).returns(success);
    
    const actual = fixture({ state, dispatch, event });

    expect(actual).to.eventually.equal(success);
  });

  it("fails to fetch anything from the api and dispatches an action as an error", () => {
    const event = { };

    const rejectedPromise =  Promise.reject(new Error("no network, or bad response"));
    const failure = "failed. error. whatever.";
    wireFetchProxyWithResponsePromise(rejectedPromise);
    dispatch.withArgs(errorAction).returns(failure);
    
    const actual = fixture({ state, dispatch, event });

    expect(actual).to.eventually.equal(failure);
  });

  const wireFetchProxyWithResponsePromise = (responsePromise) => {
    fetchProxy
      .withArgs(`https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=${apiKey}`)
      .returns(responsePromise);
  };
});
