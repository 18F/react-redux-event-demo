import { expect } from "chai";
import { default as fixture } from "../../main/eventCreators/findCandidatesWithNameLike";
import { type } from "../../main/eventCreators/findCandidatesWithNameLike";

const findCandidatesWithNameLikeType = "findCandidatesWithNameLike";

describe("findCandidatesWithNameLike eventCreator", () => {

  it("constructs as expected", () => {
    const actual = fixture();

    expect(actual).to.deep.equal({
      type: findCandidatesWithNameLikeType
    });
  });

  it("exports its type", () => {
    expect(type).to.equal(findCandidatesWithNameLikeType);
  });
});
