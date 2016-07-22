export default (response) => {
	if (response.status >= 400)  {
		throw new Error(response.statusText);
	} else {
		return response;
	}
};
