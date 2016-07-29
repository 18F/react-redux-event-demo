import { expect } from "chai";

import fixture from "../../main/actionCreators/setApiResults";
import { type } from "../../main/actionCreators/setApiResults";

const setApiResultsType = "setApiResults";

describe("setApiResults action", () => {
  it("creates an action properly", () => {
    const results = { "goooooooo": "team!" };

    const actual = fixture(results);

    expect(actual).to.deep.equal({
      type: setApiResultsType,
      results: results
    });
  });

  it("exports its type", () => {
    expect(type).to.equal(setApiResultsType);
  });
});
