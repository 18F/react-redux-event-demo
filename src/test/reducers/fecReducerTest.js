import { expect } from "chai";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

const setApiKeyType = "set api key type";

describe("fecReducer", () => {
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
      type: setApiKeyType,
      apiKey: apiKey
    });

    expect(actual).to.deep.equal({
      hasResults: false,
      apiKey: apiKey
    });
  });
});
