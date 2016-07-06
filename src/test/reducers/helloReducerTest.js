import { expect } from "chai";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

const incrementType = "increment type";

describe("helloReducer", () => {
  let fixture;
  
  beforeEach(() => {
    fixture = proxyquire("../../main/reducers/helloReducer", {
      "../actionCreators/increment": {
        type: incrementType
      }
    }).default;
  });
  
  it("initializes properly", () => {
    const actual = fixture(undefined);

    expect(actual).to.deep.equal({
      count: 0
    });
  });

  it("adds one to the counter", () => {
    const actual = fixture({
      count: 34
    }, {
      type: incrementType
    });

    expect(actual).to.deep.equal({
      count: 35
    });
  });

  it("ignores an unrelated action", () => {
    const actual = fixture({
      count: 34
    }, {
      type: "nothing to see here"
    });

    expect(actual).to.deep.equal({
      count: 34
    });
  });
});
