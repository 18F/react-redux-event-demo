const type = "setCandidates";

const setCandidates = (results) => ({
  type: type,
  results: results
});

export { setCandidates as default, type};
