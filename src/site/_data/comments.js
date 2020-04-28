const fetchData = require('../helpers/fetchData.js');

const endPoint = 'https://11ty.foxnet.fi/wp-json/wp/v2/comments?per_page=100';

module.exports = async function fetchComments() {
	return fetchData('comments', endPoint);
};
