import { expect } from "chai";
import { default as fixture } from "../../main/eventCreators/setCandidateName";
import { type } from "../../main/eventCreators/setCandidateName";

describe("setCandidateName eventCreator", () => {
  it("constructs as expected", () => {
    const candidateName = "J. Smith";
    const actual = fixture(candidateName);

    expect(actual).to.deep.equal({
      type: type,
      name: candidateName
    });
  });

  it("exports its type", () => {
    expect(type).to.equal("setCandidateName");
  });
});
