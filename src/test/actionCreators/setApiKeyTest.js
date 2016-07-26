import { expect } from "chai";
import { default as fixture } from "../../main/actionCreators/setApiKey";
import { type } from "../../main/actionCreators/setApiKey";

const setApiKeyType = "setApiKey";

describe("setApiKey actionCreator", () => {
  it("constructs properly", () => {
    const apiKey = "FL84ks8ygi894848iflisfo8yt893j";
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
