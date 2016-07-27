const setCandidateNameType = "setCandidateName";

const setCandidateName = (name) => ({
  type: setCandidateNameType,
  name: name
});

export { setCandidateNameType as type }; 

export default setCandidateName;
