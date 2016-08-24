import { expect } from "chai";

import fixture from "../../main/actionCreators/setCandidatesError";

describe("setCandidatesError action", () => {
  it("creates an action properly", () => {
    const actual = fixture();

    expect(actual).to.deep.equal({
      type: "setCandidatesError"
    });
  });
});
