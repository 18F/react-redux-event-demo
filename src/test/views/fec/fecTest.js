import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("fec view", () => {
  let Fixture;

  const fecForm = () => <div>form</div>;
  const candidates = () => <div>candidates</div>;
  
  beforeEach(() => {
    Fixture = proxyquire("../../../main/views/fec/fec", {
      "./candidates": candidates,
      "./form": fecForm
    }).default;
  });

  it("renders the form but no candidates if there are no candidates", () => {
    const reactWrapper = shallow(<Fixture />);

    expect(reactWrapper.find(fecForm)).to.have.length(1);
    expect(reactWrapper.find(candidates)).to.have.length(0);
  });

  
  it("renders the form and candidates if there are candidates", () => {
    const reactWrapper = shallow(<Fixture candidates={[]}/>);

    expect(reactWrapper.find(fecForm)).to.have.length(1);
    expect(reactWrapper.find(candidates)).to.have.length(1);
  });

  it("passes the form the api key", () => {
    const apiKey = "kshkuwhkuwhfhty8942uiaioufgw78";
    const reactWrapper = shallow(<Fixture apiKey={ apiKey }/>);

    expect(reactWrapper.find(fecForm).prop("apiKey")).to.equal(apiKey);
  });

  
  it("passes the candidate results the candidates", () => {
    const candidateData = [
      {
        hello: "world"
      },
      {
        coniferous: "green"
      }
    ];
    
    const reactWrapper = shallow(<Fixture candidates={ candidateData }/>);

    expect(reactWrapper.find(candidates).prop("candidates")).to.equal(candidateData);
  });

});
