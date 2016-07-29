import { expect } from "chai";

import fixture from "../../main/actionCreators/setApiResultsError";

describe("setApiResultsError action", () => {
  it("creates an action properly", () => {
    const actual = fixture();

    expect(actual).to.deep.equal({
      type: "setApiResultsError"
    });
  });
});
