const getNumPages = require( './../helpers/getNumPages.js' );
const fetchAll = require( './../helpers/fetchAll.js' );

const endPoint = 'https://11ty.foxnet.fi/wp-json/wp/v2/comments?per_page=100';

module.exports = async function() {
	// Get number of pages.
	const numPages = await getNumPages( endPoint );

	// Fetch all.
	const allPosts = fetchAll( numPages, endPoint );

	// And return them.
	return allPosts;
};
