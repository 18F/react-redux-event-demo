import { expect } from "chai";
import { spy } from "sinon";
import fixture from "../main/ready";

describe("ready", () => {
  beforeEach(() => {
    global.document = {};
  });

  afterEach(() => {
    global.document = undefined;
  });
            
  it("does nothing when given a non-function", () => {
    fixture({});
  });

  it("calls immediately when document already loaded/ready", () => {
    const callback = spy();
    global.document.readyState = "interactive";

    fixture(callback);

    expect(callback).called;
  });

  it("calls when document is loaded (DOMContentLoaded)", () => {
    const callback = spy();
    global.document.addEventListener = (event, callback) => {
      if (event === "DOMContentLoaded") {
        callback();
      }
    };
    
    fixture(callback);

    expect(callback).called;
  });

  
  it("does nothing document events other than DOMContentLoaded", () => {
    const callback = spy();
    global.document.addEventListener = (event, callback) => {
      if (event === "Something else") {
        callback();
      }
    };
    
    fixture(callback);

    expect(callback).to.not.be.called;
  });

});
