import { expect } from "chai";

import fixture from "../../main/actionCreators/setCandidates";
import { type } from "../../main/actionCreators/setCandidates";

const setCandidatesType = "setCandidates";

describe("setCandidates action", () => {
  it("creates an action properly", () => {
    const results = { "goooooooo": "team!" };

    const actual = fixture(results);

    expect(actual).to.deep.equal({
      type: setCandidatesType,
      results: results
    });
  });

  it("exports its type", () => {
    expect(type).to.equal(setCandidatesType);
  });
});
