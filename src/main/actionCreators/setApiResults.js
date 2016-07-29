const type = "setApiResults";

const setApiResults = (results) => ({
  type: type,
  results: results
});

export { setApiResults as default, type};
