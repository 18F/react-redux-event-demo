const type = "setApiKey";

const setApiKey = (apiKey) => ({
  type: type,
  apiKey: apiKey
});

export { type }; 
export default setApiKey;
