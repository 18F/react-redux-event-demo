const type = "setApiKey";

export { type }; 

export default (apiKey) => ({
  type: type,
  apiKey: apiKey
});;
