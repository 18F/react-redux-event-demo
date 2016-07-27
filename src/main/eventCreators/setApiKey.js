const setApiKeyType = "setApiKey";

const setApiKey = (apiKey) => ({
  type: setApiKeyType,
  apiKey: apiKey
});

export { setApiKeyType as type }; 

export default setApiKey;
