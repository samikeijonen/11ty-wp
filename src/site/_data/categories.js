const fetchData = require('../helpers/fetchData.js');

const endPoint = 'https://11ty.foxnet.fi/wp-json/wp/v2/categories?per_page=10';

module.exports = async function fetchPages() {
	return fetchData('categories', endPoint);
};
