import { expect } from "chai";
import { default as fixture } from "../../main/actionCreators/increment";
import { type } from "../../main/actionCreators/increment";

const incrementType = "increment";

describe("increment actionCreator", () => {
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
