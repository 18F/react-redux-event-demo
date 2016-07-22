import "whatwg-fetch";

const fetch = typeof self !== "undefined" ? self.fetch : global.fetch;

export default fetch;
