import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import Fixture from "../../../main/views/fec/candidates";

describe("candidates view", () => {
  it("has no list elements if there are no candidates", () => {
    const emptyCandidates = [];
    const reactWrapper = shallow(<Fixture candidates={emptyCandidates}/>);

    expect(reactWrapper.find("li")).to.have.length(0);
  });

  it("decodes house", () => {
    const candidates = [{
      name: "ellen jones",
      office_sought: "H",
      id: "H88239023"
    }];
    
    const reactWrapper = shallow(<Fixture candidates={candidates}/>);

    expect(reactWrapper.containsMatchingElement("House")).to.be.true;
  });

  it("decodes senate", () => {
    const candidates = [{
      name: "ellen jones",
      office_sought: "S",
      id: "S88239023"
    }];
    
    const reactWrapper = shallow(<Fixture candidates={candidates}/>);

    expect(reactWrapper.containsMatchingElement("Senate")).to.be.true;
  });

  it("decodes president", () => {
    const candidates = [{
      name: "ellen jones",
      office_sought: "P",
      id: "P88239023"
    }];
    
    const reactWrapper = shallow(<Fixture candidates={candidates}/>);

    expect(reactWrapper.containsMatchingElement("President/Vice President")).to.be.true;
  });

  it("has no idea when the office sought is strange", () => {
    const candidates = [{
      name: "ellen jones",
      office_sought: "Flamingo",
      id: "P88239023"
    }];
    
    const reactWrapper = shallow(<Fixture candidates={candidates}/>);

    expect(reactWrapper.containsMatchingElement("No idea.")).to.be.true;
  });
  
  it("puts in the name", () => {
    const name = "ellen jones";
    const candidates = [{
      name: name,
      office_sought: "S",
      id: "S88239023"
    }];
    
    const reactWrapper = shallow(<Fixture candidates={candidates}/>);

    expect(reactWrapper.containsMatchingElement(name)).to.be.true;
  });

  it("puts in the id and makes it a key to the li", () => {
    const name = "ellen jones";
    const id = "S2728995";
    
    const candidates = [{
      name: name,
      office_sought: "S",
      id: id
    }];
    
    const reactWrapper = shallow(<Fixture candidates={candidates}/>);

    expect(reactWrapper.containsMatchingElement(id)).to.be.true;
    expect(reactWrapper.find("li")).to.have.length(1);
    expect(reactWrapper.find("li").at(0).key()).to.equal(id);
  });

});
