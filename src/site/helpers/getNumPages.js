const axios = require('axios');

module.exports = async function getNumPages(endPoint) {
	return axios
		.get(endPoint)
		.then(function (response) {
			return response.headers['x-wp-totalpages'];
		})
		.catch(function (error) {
			console.log( error ); /* eslint-disable-line */
		});
};
