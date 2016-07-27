import { expect } from "chai";
import { default as fixture } from "../../main/actionCreators/setCandidateName";
import { type } from "../../main/actionCreators/setCandidateName";

const setCandidateNameType = "setCandidateName";

describe("setCandidateName actionCreator", () => {
  it("constructs properly", () => {
    const candidateName = "J. Doe";
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
