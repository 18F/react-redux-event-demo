import { expect } from "chai";
import { default as fixture } from "../../main/eventCreators/setApiKey";
import { type } from "../../main/eventCreators/setApiKey";

const setApiKeyType = "setApiKey";

describe("setApiKey eventCreator", () => {

  it("constructs properly", () => {
    const apiKey = "lawijeliawjew";
    const actual = fixture(apiKey);

    expect(actual).to.deep.equal({
      type: setApiKeyType,
      apiKey: apiKey
    });
  });

  it("exports its type", () => {
    expect(type).to.equal(setApiKeyType);
  });
});
