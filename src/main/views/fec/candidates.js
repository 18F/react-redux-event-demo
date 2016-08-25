import React from "react";

const candidates = ({ candidates }) => {
  const hasCandidates = candidates.length > 0;

  if (hasCandidates) {
    return showResults(candidates);
  }

  return emitNoResults();  
};

const showResults = (candidates) => {
  return (
    <ul>
      { emitCandidates(candidates) }
    </ul>
  );
};

const emitCandidates = (candidates) => {
  return candidates.map(({ id, name, office_sought }) => {
    const office = decodeOffice(office_sought);

    return (
      <li key={ id }>{ name } -- { office } -- { id }</li>
    );
  });
};

const decodeOffice = (office_sought) => {
  switch(office_sought) {
  case "H":
    return "House";
  case "S":
    return "Senate";
  case "P":
    return "President/Vice President";
  default:
    return "No idea.";
  }
};

const emitNoResults = () => {
  return (
    <p>No results</p>
  );
};

export default candidates;
