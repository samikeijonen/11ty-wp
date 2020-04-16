const flatcache = require('flat-cache');
const path = require('path');

const getNumPages = require('../helpers/getNumPages.js');
const getCacheKey = require('../helpers/getCacheKey.js');
const fetchAll = require('../helpers/fetchAll.js');

const endPoint = 'https://11ty.foxnet.fi/wp-json/wp/v2/pages?per_page=10';

module.exports = async function fetchPages() {
	const cache = flatcache.load('pages', path.resolve('./src/site/_datacache'));
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
