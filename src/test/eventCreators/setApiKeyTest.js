import { expect } from "chai";
import { default as fixture } from "../../main/eventCreators/setApiKey";
import { type } from "../../main/eventCreators/setApiKey";

describe("setApiKey eventCreator", () => {
  it("constructs as expected", () => {
    const apiKey = "lawijeliawjew";
    const actual = fixture(apiKey);

    expect(actual).to.deep.equal({
      type: type,
      apiKey: apiKey
    });
  });

  it("exports its type", () => {
    expect(type).to.equal("setApiKey");
  });
});
