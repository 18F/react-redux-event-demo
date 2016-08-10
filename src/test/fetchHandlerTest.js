import assign from "lodash.assign";
import { Promise } from "es6-promise";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { stub } from "sinon";
import proxyquire from "proxyquire";

proxyquire.noCallThru();
chai.use(chaiAsPromised);


describe("fetchHandler", () => {
  describe("raw fetch", () => {
    describe("GET / HTTP OK", () => {
      let fixture;
      let fetch = stub();
      const happyPathNoErrors = (response) => { return response; };
      
      const standardFetchProperties = {
        credentials: "same-origin",
		    headers: {
			    "Accept": "application/json",
			    "Content-Type": "application/json"
        }
      };
      
      beforeEach(() => {
        fixture = proxyquire("../main/fetchHandler", {
          "./fetchProxy": fetch,
          "./detectHttpFailureResponse": happyPathNoErrors
        }).rawFetch;
      });

      it("gets a URL", () => {
        const expectedReturn = "Hi.";
        const url = "https://www.gsa.gov";
        const expectedParams = assign({}, standardFetchProperties, { method: "GET" });
        const expectedPromise = Promise.resolve(expectedReturn);
        fetch.withArgs(url, expectedParams).returns(expectedPromise);

        const actual = fixture(url);

        return expect(actual).to.eventually.equal(expectedReturn);
      });

      it("fails the promise when the fetch fails (e.g. network issue)", () => {
        const url = "https://www.gsa.gov";
        const expectedParams = assign({}, standardFetchProperties, { method: "GET" });
        const expectedPromise = Promise.reject(new Error());
        fetch.withArgs(url, expectedParams).returns(expectedPromise);

        const actual = fixture(url);

        return expect(actual).to.be.eventually.rejectedWith(Error);
      });
    });

    describe("GET / HTTP 404", () => {
      let fixture;
      let fetch = stub();
      const httpErrorResponse = (response) => { throw new Error("404 not found"); };
      
      const standardFetchProperties = {
        credentials: "same-origin",
		    headers: {
			    "Accept": "application/json",
			    "Content-Type": "application/json"
        }
      };
      
      beforeEach(() => {
        fixture = proxyquire("../main/fetchHandler", {
          "./fetchProxy": fetch,
          "./detectHttpFailureResponse": httpErrorResponse
        }).rawFetch;
      });

      it("gets a 404 from a URL and returns an error", () => {
        const expectedReturn = "Hi.";
        const url = "https://www.gsa.gov";
        const expectedParams = assign({}, standardFetchProperties, { method: "GET" });
        const expectedPromise = Promise.resolve(expectedReturn);
        fetch.withArgs(url, expectedParams).returns(expectedPromise);

        const actual = fixture(url);

        return expect(actual).to.be.eventually.rejectedWith(Error);
      });
    });

    describe("POST / HTTP OK", () => {
      let fixture;
      let fetch = stub();
      const happyPathNoErrors = (response) => { return response; };
      
      const standardFetchProperties = {
        credentials: "same-origin",
		    headers: {
			    "Accept": "application/json",
			    "Content-Type": "application/json"
        }
      };
      
      beforeEach(() => {
        fixture = proxyquire("../main/fetchHandler", {
          "./fetchProxy": fetch,
          "./detectHttpFailureResponse": happyPathNoErrors
        }).rawFetch;
      });

      it("post a body to a URL", () => {
        const expectedReturn = "Hi.";
        const url = "https://www.gsa.gov";
        const body = {
          "one": "JSON",
          "to": "rule",
          "them": "all"
        };
        
        const expectedParams = assign({}, standardFetchProperties, { method: "POST", body: body });
        const expectedPromise = Promise.resolve(expectedReturn);
        fetch.withArgs(url, expectedParams).returns(expectedPromise);

        const actual = fixture(url, "POST", body);

        return expect(actual).to.eventually.equal(expectedReturn);
      });
    });
  });

  describe("fetchJson default", () => {
    describe("GET / HTTP OK", () => {
      let fixture;
      let fetch = stub();
      const happyPathNoErrors = (response) => { return response; };
      
      const standardFetchProperties = {
        credentials: "same-origin",
		    headers: {
			    "Accept": "application/json",
			    "Content-Type": "application/json"
        }
      };
      
      beforeEach(() => {
        fixture = proxyquire("../main/fetchHandler", {
          "./fetchProxy": fetch,
          "./detectHttpFailureResponse": happyPathNoErrors
        }).default;
      });

      it("gets a URL", () => {
        const response = { "Hi": "world" };
        const url = "https://www.gsa.gov";
        const expectedParams = assign({}, standardFetchProperties, { method: "GET" });
        const mockResponse = {
          json: () => {
            return Promise.resolve(response);
          }
        };
        const jsonPromise =  Promise.resolve(mockResponse);
        fetch.withArgs(url, expectedParams).returns(jsonPromise);

        const actual = fixture(url);

        return expect(actual).to.eventually.equal(response);
      });

      it("fails the promise when the fetch fails (e.g. network issue)", () => {
        const url = "https://www.gsa.gov";
        const expectedParams = assign({}, standardFetchProperties, { method: "GET" });
        const expectedPromise = Promise.reject(new Error());
        fetch.withArgs(url, expectedParams).returns(expectedPromise);

        const actual = fixture(url);

        return expect(actual).to.be.eventually.rejectedWith(Error);
      });
    });

    describe("GET / HTTP 404", () => {
      let fixture;
      let fetch = stub();
      const httpErrorResponse = (response) => { throw new Error("404 not found"); };
      
      const standardFetchProperties = {
        credentials: "same-origin",
		    headers: {
			    "Accept": "application/json",
			    "Content-Type": "application/json"
        }
      };
      
      beforeEach(() => {
        fixture = proxyquire("../main/fetchHandler", {
          "./fetchProxy": fetch,
          "./detectHttpFailureResponse": httpErrorResponse
        }).default;
      });

      it("gets a 404 from a URL and returns an error", () => {
        const expectedReturn = "Hi.";
        const url = "https://www.gsa.gov";
        const expectedParams = assign({}, standardFetchProperties, { method: "GET" });
        const expectedPromise = Promise.resolve(expectedReturn);
        fetch.withArgs(url, expectedParams).returns(expectedPromise);

        const actual = fixture(url);

        return expect(actual).to.be.eventually.rejectedWith(Error);
      });
    });

    describe("POST / HTTP OK", () => {
      let fixture;
      let fetch = stub();
      const happyPathNoErrors = (response) => { return response; };
      
      const standardFetchProperties = {
        credentials: "same-origin",
		    headers: {
			    "Accept": "application/json",
			    "Content-Type": "application/json"
        }
      };
      
      beforeEach(() => {
        fixture = proxyquire("../main/fetchHandler", {
          "./fetchProxy": fetch,
          "./detectHttpFailureResponse": happyPathNoErrors
        }).default;
      });

      it("post a body to a URL", () => {
        const expectedReturn = "Hi.";
        const url = "https://www.gsa.gov";
        const body = {
          "one": "JSON",
          "to": "rule",
          "them": "all"
        };
        
        const expectedParams = assign({}, standardFetchProperties, { method: "POST", body: body });
        const jsonPromise = Promise.resolve({
          json: () => {
            return Promise.resolve(expectedReturn);
          }
        });
        fetch.withArgs(url, expectedParams).returns(jsonPromise);

        const actual = fixture(url, "POST", body);

        return expect(actual).to.eventually.equal(expectedReturn);
      });
    });
  });
});
