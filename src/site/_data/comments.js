const flatcache = require('flat-cache');
const path = require('path');

const getNumPages = require('../helpers/getNumPages.js');
const getCacheKey = require('../helpers/getCacheKey.js');
const fetchAll = require('../helpers/fetchAll.js');

const endPoint = 'https://11ty.foxnet.fi/wp-json/wp/v2/comments?per_page=100';

module.exports = async function fetchComments() {
	const cache = flatcache.load('comments', path.resolve('./src/site/_datacache'));
	const key = getCacheKey();
	const cachedData = cache.getKey(key);

	// Fetch again if we don't have cache.
	if (!cachedData) {
		// Get number of pages.
		const numPages = await getNumPages(endPoint);

		// Fetch all.
		const allPosts = await fetchAll(numPages, endPoint);

		// Set and save cache.
		cache.setKey(key, allPosts);
		cache.save();
		return allPosts;
	}

	// And return them.
	return cachedData;
};
