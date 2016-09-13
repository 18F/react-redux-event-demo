import { expect } from "chai";
import { default as fixture } from "../../main/eventCreators/increment";
import { type } from "../../main/eventCreators/increment";

describe("increment eventCreator", () => {
  it("constructs as expected", () => {
    const actual = fixture();

    expect(actual).to.deep.equal({
      type: type
    });
  });

  it("exports its type", () => {
    expect(type).to.equal("increment");
  });
});
