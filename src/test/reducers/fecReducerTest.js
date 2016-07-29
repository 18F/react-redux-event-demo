import { expect } from "chai";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

const setApiKeyType = "set api key type";
const setCandidateNameType = "set candidate name type";
const setApiResultsType = "set api results type";

describe("fecReducer", () => {
  describe("set api key", () => {
    let fixture;
    
    beforeEach(() => {
      fixture = proxyquire("../../main/reducers/fecReducer", {
        "../actionCreators/setApiKey": {
          type: setApiKeyType
        }
      }).default;
    });

    it("initializes to a state with no results", () => {
      const actual = fixture(undefined);
      
      expect(actual).to.deep.equal({
        hasResults: false
      });
    });
  
    it("sets an api key", () => {
      const apiKey = "lfijliwjfrjsl";
      const actual = fixture({
        hasResults: false
      }, {
        type: setApiKeyType,
        apiKey: apiKey
      });

      expect(actual).to.deep.equal({
        hasResults: false,
        apiKey: apiKey
      });
    });

    it("ignores irrelevant actions", () => {
      const originalState = {
        anyState: "ok"
      };
      
      const actual = fixture(originalState, {
        type: "wufhuiehgurg",
        apiKey: "hi"
      });

      expect(actual).to.deep.equal(originalState);
    });
  });

  describe("set candidate name", () => {
    let fixture;
    
    beforeEach(() => {
      fixture = proxyquire("../../main/reducers/fecReducer", {
        "../actionCreators/setCandidateName": {
          type: setCandidateNameType
        }
      }).default;
    });

    it("sets a candidate name", () => {
      const candidateName = "name";
      const actual = fixture({
        hasResults: false
      }, {
        type: setCandidateNameType,
        name: candidateName
      });

      expect(actual).to.deep.equal({
        hasResults: false,
        candidateName: candidateName
      });
    });

    it("ignores irrelevant actions", () => {
      const originalState = {
        anyState: "ok"
      };
      
      const actual = fixture(originalState, {
        type: "wufhuiehgurg",
        name: "hi"
      });

      expect(actual).to.deep.equal(originalState);
    });
  });

  describe("sets candidates with name like", () => {
    let fixture;
    
    beforeEach(() => {
      fixture = proxyquire("../../main/reducers/fecReducer", {
        "../actionCreators/setApiResults": {
          type: setApiResultsType
        }
      }).default;
    });

    it("sets candidates with name like with results", () => {
      const results = {
        "hoo": "boo",
        "woo": "doo",
        "soo": {
          "noo": "goo"
        }
      };
      
      const actual = fixture({
      }, {
        type: setApiResultsType,
        results: results
      });

      expect(actual).to.deep.equal({
        candidates: results
      });
    });

    it("ignores irrelevant actions", () => {
      const originalState = {
        anyState: "ok"
      };
      
      const actual = fixture(originalState, {
        type: "wufhuiehgurg",
        name: "hi"
      });

      expect(actual).to.deep.equal(originalState);
    });
  });
});
