import assign from "lodash.assign";
import fetch from "./fetchProxy";
import detectHttpFailureResponse from "./detectHttpFailureResponse";

const rawFetch = (url, method = "GET", body) => {
	let fetchParams = {
		method: method,
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	};
		
	if (body) {
		fetchParams = assign({}, fetchParams, { body: body });
	}
	
	return fetch(url, fetchParams)
		.then(detectHttpFailureResponse);
};

const jsonFetch = (url, method, body) => {
  return rawFetch(url, method, body)
    .then(processResultsAsJson);
};

const processResultsAsJson = (results) => {
  return results.json();
};

export { rawFetch };
export default jsonFetch;
