import { expect } from "chai";
import { default as fixture } from "../../main/eventCreators/increment";
import { type } from "../../main/eventCreators/increment";

const incrementType = "increment";

describe("increment eventCreator", () => {
  it("has the right type", () => {
    const actual = fixture();

    expect(actual).to.deep.equal({
      type: incrementType
    });
  });

  it("exports its type", () => {
    expect(type).to.equal(incrementType);
  });
});
