import { expect } from "chai";
import { default as fixture } from "../../main/eventCreators/setCandidateName";
import { type } from "../../main/eventCreators/setCandidateName";

const setCandidateNameType = "setCandidateName";

describe("setCandidateName eventCreator", () => {

  it("constructs properly", () => {
    const candidateName = "J. Smith";
    const actual = fixture(candidateName);

    expect(actual).to.deep.equal({
      type: setCandidateNameType,
      name: candidateName
    });
  });

  it("exports its type", () => {
    expect(type).to.equal(setCandidateNameType);
  });
});
